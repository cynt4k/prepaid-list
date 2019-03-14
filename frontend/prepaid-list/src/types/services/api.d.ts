import { Observable } from 'rxjs';

export interface IApiService {
    get(path: string): Observable<any>;
    post(path: string, data: any): Observable<any>;
}
