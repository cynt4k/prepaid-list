import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { Playlist } from "src/app/core/models/playlist.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PlaylistService {
    constructor(private apiService: ApiService) { }

    createPlaylist(name: string): Observable<Playlist> {
        let path = "playlist";
        let playlist = { name: name };
        return this.apiService.post(path, playlist)
            .pipe(map(response => {
                console.log("Response:", response);
                let playlist: Playlist = { id: response.data.id, name: response.data.name, owner: response.data.owner, songs: response.data.songs };
                return playlist;
            }, error => { console.log(error, "error") }
            ));
    }
    getPlaylistById(id: string): Observable<Playlist> {
        let path = "playlist/" + id;
        return this.apiService.get(path)
            .pipe(map(response => {
                console.log("Response:", response);
                let playlist: Playlist = { id: response.data.id, name: response.data.name, owner: response.data.owner, songs: response.data.songs };
                return playlist;
            }, error => { console.log(error, "error") }
            ));
    }

}