import { injectable } from 'inversify';
import router from 'vue-router';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
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

    public get<T>(path: string, requireAuth?: boolean): Observable<IResponse<T>> {
        const url = `${this.api}/${path}`;
        const config: AxiosRequestConfig = {
            params: { authRequired: (requireAuth) ? true : false },
        };
        return Observable.create((observer: any) => {
            axios.get(url, config).then((response) => {
                observer.next(response.data);
                observer.complete();
            }).catch((e) => {
                observer.error(e);
            });
        });
    }

    public post<T>(path: string, data: any, requireAuth?: boolean): Observable<IResponse<T>> {
        const url = `${this.api}/${path}`;
        const config: AxiosRequestConfig = {
            params: { authRequired: (requireAuth) ? true : false }
        };
        return Observable.create((observable: any) => {
            axios.post(url, data, config).then((response) => {
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


            if (config.url!.includes('auth/refresh')) {
                config.headers.Authorization = token;
                config.params.authRequired = undefined;
                return Promise.resolve(config);
            }

            if (!config.params.authRequired) {
                config.params.authRequired = undefined;
                return Promise.resolve(config);
            }
            config.params.authRequired = undefined;
            config.headers = {
                'Authorization': token
            };

            if (token) {
                try {
                    const newToken = await this.post<IResponseToken>(`auth/refresh`, { refreshToken }).toPromise();
                    this._jwt.saveToken(newToken.data.token);
                    return Promise.resolve(config);
                } catch (e) {
                    this._jwt.destoryToken();
                    this._jwt.destoryRefreshToken();
                    return Promise.reject(e);
                }
            }

            return Promise.resolve(config);
        });
    }
}
