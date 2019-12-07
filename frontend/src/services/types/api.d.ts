import { Observable } from 'rxjs';
import { IResponse } from '@/services/entities/api';

export interface IApiService {
    get<T>(path: string, requireAuth?: boolean): Observable<IResponse<T>>;
    post<T>(path: string, data: any, requireAuth?: boolean): Observable<IResponse<T>>;
    put<T>(path: string, data: any, requireAuth?: boolean): Observable<IResponse<T>>;
}
