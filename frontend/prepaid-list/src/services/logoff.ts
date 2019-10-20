import { injectable } from 'inversify';
import { JwtService } from './jwt.service';
import { container } from '@/inversify.config';
import { IJwtService, IApiService } from '@/types';
import { ILogoffService } from '@/types/services/logoff.service';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { Getter } from 'vuex-class';
import { IResponseToken } from '@/interfaces/services';

// tslint:disable: no-console

@injectable()
export class LogoffService implements ILogoffService {
    private jwt: IJwtService;
    private api: IApiService;
    private maxTimeLeftInSeconds: number = 60; // default 60 seconds
    private decodedToken: any;

    constructor() {
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
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
        const newToken = await this.api
            .post<IResponseToken>(`auth/refresh`, { refreshToken: this.jwt.getRefreshToken() })
            .toPromise();
        this.jwt.saveToken(newToken.data.token);

        // decode new token and save to service
        this.setUp();
    }

    private validateDecodedToken(decToken: any) {
        const now = this.getCurrentTimeInSeconds();
        if (typeof decToken.exp !== 'undefined' && decToken.exp < now) {
            console.log(`token expired: ${JSON.stringify(decToken)}`);
            // throw new Error(`token expired: ${JSON.stringify(decoded)}`)
        }

        if (typeof this.decodedToken.nbf !== 'undefined' && this.decodedToken.nbf > now) {
            console.log(`token not yet valid: ${JSON.stringify(this.decodedToken)}`);
            // throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
        }
    }

    private setUp() {
        const token = this.jwt.getToken();
        const now = this.getCurrentTimeInSeconds();
        this.decodedToken = this.jwt.decodeToken(token);

        // validate the decoded token
        this.validateDecodedToken(this.decodedToken);

        this.maxTimeLeftInSeconds = this.decodedToken.exp - this.decodedToken.iat;

        // logging
        console.log('MaxTimeLeftInSeconds: ' + this.maxTimeLeftInSeconds);
        console.log('CurrTimeLeftInSeconds: ' + (this.decodedToken.exp - now));
    }

    private getCurrentTimeInSeconds() {
        return Date.now().valueOf() / 1000;
    }
}
