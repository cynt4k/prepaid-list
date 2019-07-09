import { injectable } from 'inversify';
import { IJwtService } from '@/types';
import jwt_decode from 'jwt-decode';

@injectable()
export class JwtService implements IJwtService {
    public getToken() {
        return window.localStorage[`token`];
    }

    public getRefreshToken() {
        return window.localStorage[`refreshToken`];
    }

    public saveToken(token: string) {
        window.localStorage[`token`] = token;
    }

    public saveRefreshToken(refreshToken: string) {
        window.localStorage[`refreshToken`] = refreshToken;
    }

    public destoryToken() {
        window.localStorage.removeItem(`token`);
    }

    public destoryRefreshToken() {
        window.localStorage.removeItem(`refreshToken`);
    }

    public decodeToken(token: string) {
        let test = jwt_decode(token);
        console.log(test);
        return test;
    }
}
