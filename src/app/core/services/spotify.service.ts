import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { Playlist } from "src/app/core/models/playlist.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { JwtService } from "src/app/core/services/jwt.service";

@Injectable()
export class SpotifyService {
    constructor(private apiService: ApiService, private jwtService: JwtService) { }

    saveToken(token: string): Observable<Object> {
        let path = "spotify/auth";
        let userToken = this.jwtService.getToken();
        let tokenBody = { auth_code: token };
        return this.apiService.post(path, tokenBody)
            .pipe(map(
                data => {
                    console.log("Response:", data);
                    return data;
                }, error => { console.log(error, "error") }
            ));
    }
}