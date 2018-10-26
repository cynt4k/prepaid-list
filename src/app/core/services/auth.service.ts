import { Injectable } from '@angular/core';
import { Host } from 'src/app/core/models/host.model';
import { User } from 'src/app/core/models/user.model';
import { debug, error } from 'util';
import { ReplaySubject, Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/core/services/api.service';
import { map } from 'rxjs/operators';
import { JwtService } from 'src/app/core/services/jwt.service';

@Injectable()
export class AuthService {
    private host;
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(private http: Http, private apiService: ApiService, private jwtService: JwtService) { }

    isLoggedIn(): boolean {
        return this.host != null;
    }

    register(email: string, username: string, password: string): Observable<User> {
        let path = "auth/register";
        let host: Host = { username: username, email: email, password: password };
        return this.apiService.post(path, host)
            .pipe(map(
                data => {
                    console.log("Response:", data);
                    return data;
                }, error => { console.log(error, "error") }
            ));
    }

    login(username: string, password: string) {
        let path = "auth/login/host";
        this.host = { username: username, password: password };
        return this.apiService.post(path, this.host)
            .pipe(map(
                response => {
                    let token = response.data.token;
                    this.jwtService.saveToken(token);
                    this.isAuthenticatedSubject.next(true);
                    return response;
                }, error => { console.log(error, "error") }
            ));
    }

    logout() {
        this.host = null;
        this.isAuthenticatedSubject.next(false);
    }

    getUser() {
        return this.host;
    }
}
