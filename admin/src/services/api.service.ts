import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Observable, TeardownLogic, Subscriber } from 'rxjs';
import { IApiResponse } from '@/types/service';

export const ApiService = {
    get,
    post,
    put,
    del
};

const _url = process.env.APP_API_URL || 'http://localhost:3000';

(async (): Promise<void> => {
    axios.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
        if (!config.params.authRequired) {
            config.params.authRequired = undefined;
            return config;
        }
        return config;
    });
})();

function get<T>(path: string, requireAuth?: boolean): Observable<IApiResponse<T>> {
    const url = `${_url}/${path}`;
    const config: AxiosRequestConfig = {
        params: { authRequired: (requireAuth) ? true : false }
    };

    return new Observable((observer: Subscriber<IApiResponse<T>>): TeardownLogic => {
        axios.get<IApiResponse<T>>(url, config).then((res: AxiosResponse<IApiResponse<T>>) => {
            observer.next(res.data);
            observer.complete();
        }).catch((e: AxiosError<IApiResponse<any>>) => {
            observer.error(e);
        });
    });
}

function post<T>(path: string, data: unknown, requireAuth?: boolean): Observable<IApiResponse<T>> {
    const url = `${_url}/${path}`;
    const config: AxiosRequestConfig = {
        params: { authRequired: (requireAuth) ? true : false }
    };

    return new Observable((observer: Subscriber<IApiResponse<T>>): TeardownLogic => {
        axios.post<IApiResponse<T>>(url, data, config).then((res: AxiosResponse<IApiResponse<T>>) => {
            observer.next(res.data);
            observer.complete();
        }).catch((e: AxiosError<IApiResponse<any>>) => {
            observer.error(e);
        });
    });
}

function put<T>(path: string, data: unknown, requireAuth?: boolean): Observable<IApiResponse<T>> {
    return post<T>(path, data, requireAuth);
}

function del(path: string, id: string, requireAuth?: boolean): Observable<IApiResponse<undefined>> {
    const url = `${_url}/${path}`;
    const config: AxiosRequestConfig = {
        params: { authRequired: (requireAuth) ? true : false }
    };

    return new Observable((observer: Subscriber<IApiResponse<undefined>>): TeardownLogic => {
        axios.delete<IApiResponse<undefined>>(url, config).then((res: AxiosResponse<IApiResponse<undefined>>) => {
            observer.next();
            observer.complete();
        }).catch((e: AxiosError<IApiResponse<any>>) => {
            observer.error(e);
        });
    });
}

