import { Observable } from 'rxjs';
import { IApiResponse } from '@/interfaces/services';

export interface IApiService {
    get(path: string): Observable<IApiResponse<any>>;
    post(path: string, data: any): Observable<IApiResponse<any>>;
}
