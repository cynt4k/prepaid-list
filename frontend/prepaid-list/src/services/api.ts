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
    private jwt: JwtService;

    constructor() {
        // this.api = 'http://app02.dev.nue.schneider-its.net:3000';
        this.api = process.env.VUE_APP_API_URL || 'http://localhost:3000';
        // this.api = process.env.VUE_APP_API_URL;
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
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
        return Observable.create((observer: any) => {
            axios.post(url, data, config).then((response) => {
                observer.next(response.data);
                observer.complete();
            }).catch((e) => {
                observer.error(e);
            });
        });
    }

    public put<T>(path: string, data: any, requireAuth?: boolean): Observable<IResponse<T>> {
        const url = `${this.api}/${path}`;
        const config: AxiosRequestConfig = {
            params: { authRequired: (requireAuth) ? true : false }
        };
        return Observable.create((observer: any) => {
            axios.put(url, data, config).then((response) => {
                observer.next(response.data);
                observer.complete();
            }).catch((e) => {
                observer.error(e);
            });
        });
    }

    private interceptor() {
        axios.interceptors.request.use(async (config) => {
            const token = this.jwt.getToken();
            const refreshToken = this.jwt.getRefreshToken();
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
                Authorization: token
            };

            if (token) {
                try {
                    const newToken = await this.post<IResponseToken>(`auth/refresh`, { refreshToken }).toPromise();
                    this.jwt.saveToken(newToken.data.token);
                    return Promise.resolve(config);
                } catch (e) {
                    this.jwt.destoryToken();
                    this.jwt.destoryRefreshToken();
                    return Promise.reject(e);
                }
            }

            return Promise.resolve(config);
        });
    }
}
