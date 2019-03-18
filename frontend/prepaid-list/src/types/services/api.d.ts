import { Observable } from 'rxjs';
import { IApiResponse } from '@/interfaces/services';

export interface IApiService {
    get<T>(path: string): Observable<IApiResponse<any>>;
    post<T>(path: string, data: any): Observable<IApiResponse<any>>;
}
