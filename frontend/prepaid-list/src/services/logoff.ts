import { injectable } from 'inversify';
import { JwtService } from './jwt.service';
import { container } from '@/inversify.config';
import { IJwtService } from '@/types';
import { ILogoffService } from '@/types/services/logoff.service';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { Getter } from 'vuex-class';

@injectable()
export class LogoffService implements ILogoffService {
    private jwt: IJwtService;
    private maxTimeLeftInSeconds: number = 60;
    private currTimeLeftInSeconds: number = this.maxTimeLeftInSeconds;
    private decodedToken: any;

    constructor() {
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
        this.initialize();

        // start timeout for auto-logoff in milliseconds
        // setTimeout(this.performAutoLogoff, this.maxTimeLeftInSeconds * 1000);
    }

    public getMaxTimeLeftInSeconds() {
        return this.maxTimeLeftInSeconds;
    }

    public getCurrTimeLeftInSeconds() {
        const now = Date.now().valueOf() / 1000;
        return Math.trunc(this.decodedToken.exp - now);
        // return this.currTimeLeftInSeconds;
    }

    public performAutoLogoff() {
        console.log('It is something :)');
    }

    private initialize() {
        console.log('LogoffService initialize');
        const token = this.jwt.getToken();
        const now = Date.now().valueOf() / 1000;
        this.decodedToken = this.jwt.decodeToken(token);

        if (typeof this.decodedToken.exp !== 'undefined' && this.decodedToken.exp < now) {
            console.log(`token expired: ${JSON.stringify(this.decodedToken)}`);
            // throw new Error(`token expired: ${JSON.stringify(decoded)}`)
		}
		
        if (typeof this.decodedToken.nbf !== 'undefined' && this.decodedToken.nbf > now) {
            console.log(`token not yet valid: ${JSON.stringify(this.decodedToken)}`);
            // throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
        }

        this.maxTimeLeftInSeconds = this.decodedToken.exp - this.decodedToken.iat;

        console.log('MaxTimeLeftInSeconds: ' + this.maxTimeLeftInSeconds);
        console.log('CurrTimeLeftInSeconds: ' + (this.decodedToken.exp - now));
    }


    // public performAutoLogoff(minutes: number) {
    // 	const token = this.jwt.getToken;
    // 	const now = Date.now().valueOf() / 1000;
    // 	const decoded = this.jwt.decodeToken(token);

    // 	if (typeof token.exp !== 'undefined' && decoded.exp < now) {
    // 		throw new Error(`token expired: ${JSON.stringify(decoded)}`)
    // 	}
    // 	if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    // 		throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
    // 	}
    // }
}
