import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { catchError } from 'rxjs/operators/catchError';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map, filter, mergeMap } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable()
export class ApiService {
  private headers;
  constructor(
    private http: HttpClient, private jwtService: JwtService
  ) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", 'application/json');
    headers = headers.append('Accept', 'application/json');
    let token = jwtService.getToken();
    if (token) {
      headers = headers.append('x-access-token', `${token}`);
    }
    this.headers = headers
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

    return this.http.get(`${environment.backendApiUrl}${path}`, {headers: this.headers, params: params})
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.backendApiUrl}${path}`,
      JSON.stringify(body), {headers: this.headers}
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.backendApiUrl}${path}`,
      JSON.stringify(body), {headers: this.headers}
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.backendApiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
