import { ApiService } from './api.service';
import { ApiPaths, IResponseToken, IApiResponse } from '@/types/service';
import { Observable } from 'rxjs';

export const UserService = {
    postLogin
};

const paths: ApiPaths = {
    login: 'manage/auth'
};

async function postLogin(username: string, password: string): Promise<IResponseToken> {
    return new Promise<IResponseToken>((resolve, reject): void => {
        ApiService.post<IResponseToken>(paths.login, { username, password }, false).subscribe((observer) => {
            return resolve({
                refreshToken: observer.data!.refreshToken,
                token: observer.data!.token,
                user: observer.data!.user
            });
        }, (error) => {
            return reject(error);
        });
    });
    // return ApiService.post<IResponseToken>(ApiPaths.login, { username, password }, false);
}
