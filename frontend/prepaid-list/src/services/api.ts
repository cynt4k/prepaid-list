import { injectable } from 'inversify';
import axios, { AxiosPromise } from 'axios';
import { Observable, from, observable } from 'rxjs';
import { IApiService, IJwtService } from '@/types';
import { IResponse, IResponseToken } from '@/interfaces/services';
import { JwtService } from './jwt.service';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';

@injectable()
export class ApiService implements IApiService {
    private api: string;
    private _jwt: JwtService;

    constructor() {
        this.api = 'http://app02.dev.nue.schneider-its.net:3000';
        this._jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
        this.interceptor();
    }

    public get<T>(path: string): Observable<IResponse<T>> {
        const url = `${this.api}/${path}`;
        return Observable.create((observer: any) => {
            axios.get(url).then((response) => {
                observer.next(response.data);
                observer.complete();
            }).catch((e) => {
                observer.error(e);
            });
        });
    }

    public post<T>(path: string, data: any): Observable<IResponse<T>> {
        const url = `${this.api}/${path}`;
        return Observable.create((observable: any) => {
            axios.post(url, data).then((response) => {
                observable.next(response.data);
                observable.complete();
            }).catch((e) => {
                observable.error(e);
            });
        });
    }

    private interceptor() {
        axios.interceptors.request.use(async (config) => {
            const token = this._jwt.getToken();
            const refreshToken = this._jwt.getRefreshToken();
            const headersConfig: any = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            if (token) {
                headersConfig[`Authorization`] = `${token}`;

                try {
                    const newToken = await this.get<IResponseToken>(`auth/refreshToken`).toPromise();
                    this._jwt.saveToken(newToken.data.token);
                    return Promise.resolve(config);
                } catch (e) {
                    return Promise.reject(e);
                }
            }

            return Promise.resolve(config);
        });
    }
}
