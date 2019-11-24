import { Observable } from 'rxjs';
import { IApiResponse } from '@/interfaces/services';

export interface IApiService {
    get<T>(path: string, requireAuth?: boolean): Observable<IApiResponse<any>>;
    post<T>(path: string, data: any, requireAuth?: boolean): Observable<IApiResponse<any>>;
    put<T>(path: string, data: any, requireAuth?: boolean): Observable<IApiResponse<any>>;
}
