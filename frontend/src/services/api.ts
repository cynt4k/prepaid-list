import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { Observable, from, observable } from 'rxjs';
import { IApiService, IJwtService } from '@/types';
import { IResponse, IResponseToken } from '@/interfaces/services';
import { JwtService } from './jwt.service';
import { EventBus } from '@/assets/EventBus';
import Factory from './factory';

export class ApiService implements IApiService {
    private api: string;

    constructor() {
      this.api = process.env.VUE_APP_API_URL || 'http://localhost:3000';
      this.interceptor();
    }

    public get<T>(
      path: string,
      requireAuth?: boolean
    ): Observable<IResponse<T>> {
      const url = `${this.api}/${path}`;
      const config: AxiosRequestConfig = {
        params: { authRequired: !!requireAuth }
      };
      return Observable.create((observer: any) => {
        axios
          .get(url, config)
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((e) => {
            observer.error(e);
          });
      });
    }

    public post<T>(
      path: string,
      data: any,
      requireAuth?: boolean
    ): Observable<IResponse<T>> {
      const url = `${this.api}/${path}`;
      const config: AxiosRequestConfig = {
        params: { authRequired: !!requireAuth }
      };
      return Observable.create((observer: any) => {
        axios
          .post(url, data, config)
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((e) => {
            observer.error(e);
          });
      });
    }

    public put<T>(
      path: string,
      data: any,
      requireAuth?: boolean
    ): Observable<IResponse<T>> {
      const url = `${this.api}/${path}`;
      const config: AxiosRequestConfig = {
        params: { authRequired: !!requireAuth }
      };
      return Observable.create((observer: any) => {
        axios
          .put(url, data, config)
          .then((response) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((e) => {
            observer.error(e);
          });
      });
    }

    private interceptor() {
      axios.interceptors.request.use(async(config) => {
        const token = Factory.getInstance().JwtService.getToken();
        const refreshToken = Factory.getInstance().JwtService.getRefreshToken();
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

        // TODO: Umbauen auf EventBus und VUEX
        // -> Action ausführen wenn AKTUALISIERUNG emitted wird und Logout wenn INVALID emitted wird!
        if (token) {
          try {
            EventBus.$emit('token-refresh');
            return Promise.resolve(config);
          } catch (e) {
            EventBus.$emit('token-invalid');
            // this.jwt.destroyToken();
            // this.jwt.destroyRefreshToken();
            return Promise.reject(e);
          }
        }

        return Promise.resolve(config);
      });
    }
}
