import { injectable} from 'inversify';
import axios, { AxiosPromise } from 'axios';
import { Observable, from } from 'rxjs';
import { IApiService } from '@/types';

@injectable()
export class ApiService implements IApiService {
    private api: string;

    constructor() {
        this.api = 'http://app02.dev.nue.schneider-its.net:3000';
    }

    // public get(path: string): Observable<any> {
    //     const url = `${this.api}/${path}`;
    //     const data = axios.get(url).then((response) => {

    //     });
    //     return from(axios.get(url));
    // }

    public get(path: string): Observable<any> {
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

    public post(path: string, data: any): Observable<any> {
        const url = `${this.api}/${path}`;
        return from(axios.post(url, data));
    }
}