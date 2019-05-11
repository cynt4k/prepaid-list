import { injectable } from 'inversify';
import { IJwtService } from '@/types';

@injectable()
export class JwtService implements IJwtService {
    public getToken() {
        return window.localStorage[`token`];
    }

    public getRefreshToken() {
        return window.localStorage[`refreshToken`];
    }

    public getUsername() {
        return window.localStorage[`user`];
    }

    public saveToken(token: string) {
        window.localStorage[`token`] = token;
    }

    public saveRefreshToken(refreshToken: string) {
        window.localStorage[`refreshToken`] = refreshToken;
    }

    public saveUsername(username: string) {
        window.localStorage[`user`] = username;
    }

    public destoryToken() {
        window.localStorage.removeItem(`token`);
    }

    public destoryRefreshToken() {
        window.localStorage.removeItem(`refreshToken`);
    }
}
