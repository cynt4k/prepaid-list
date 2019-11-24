import { IJwtService, IApiService } from '@/types';
import { ILogoffService } from '@/types/services/logoff.service';
import { IResponseToken } from '@/interfaces/services';
import Factory from './factory';

// tslint:disable: no-console

export class LogoffService implements ILogoffService {
    private maxTimeLeftInSeconds: number = 60; // default 60 seconds
    private decodedToken: any;

    constructor() {
      this.setUp();
    }

    public getMaxTimeLeftInSeconds() {
      return this.maxTimeLeftInSeconds;
    }

    public getCurrTimeLeftInSeconds() {
      return Math.trunc(this.decodedToken.exp - this.getCurrentTimeInSeconds());
    }

    // Refresh the current token - based on the RefreshToken.
    public async refreshToken() {
      // TODO: Tobi anhauen wg. Möglichkeit den Token zu refreshen -> über API?
      // TODO: Call refreshToken(); -> GUI wird automatisch aktualisiert
      const newToken = await Factory.getInstance().ApiService
        .post<IResponseToken>('auth/refresh', { refreshToken: Factory.getInstance().JwtService.getRefreshToken() })
        .toPromise();
      Factory.getInstance().JwtService.saveToken(newToken.data.token);

      // decode new token and save to service
      this.setUp();
    }

    private validateDecodedToken(decToken: any): boolean {
      const now = this.getCurrentTimeInSeconds();
      if (typeof decToken.exp !== 'undefined' && decToken.exp < now) {
        return false;
        // console.log(`token expired: ${JSON.stringify(decToken)}`);
        // throw new Error(`token expired: ${JSON.stringify(decoded)}`)
      }

      if (typeof this.decodedToken.nbf !== 'undefined' && this.decodedToken.nbf > now) {
        // console.log(`token not yet valid: ${JSON.stringify(this.decodedToken)}`);
        // throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
        return false;
      }
      return true;
    }

    private setUp() {
      const token = Factory.getInstance().JwtService.getToken();
      const now = this.getCurrentTimeInSeconds();
      this.decodedToken = Factory.getInstance().JwtService.decodeToken(token);

      // validate the decoded token
      if (this.validateDecodedToken(this.decodedToken)) {
        this.maxTimeLeftInSeconds = this.decodedToken.exp - this.decodedToken.iat;
      }

      // logging
      // console.log('MaxTimeLeftInSeconds: ' + this.maxTimeLeftInSeconds);
      // console.log('CurrTimeLeftInSeconds: ' + (this.decodedToken.exp - now));
    }

    private getCurrentTimeInSeconds() {
      return Date.now().valueOf() / 1000;
    }
}
