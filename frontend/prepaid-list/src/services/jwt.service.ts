import { injectable, inject } from 'inversify';
import { IJwtService, IApiService } from '@/types';
import jwt_decode from 'jwt-decode';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IResponseToken } from '@/interfaces/services';

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

    public destroyToken() {
        window.localStorage.removeItem(`token`);
    }

    public destroyRefreshToken() {
        window.localStorage.removeItem(`refreshToken`);
    }

    public decodeToken(token: string) {
        return jwt_decode(token);
    }
}
