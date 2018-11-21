import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { PlaylistService } from 'src/app/core/services/playlist.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { StateService } from './core/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService, ApiService, PlaylistService, JwtService, StateService]
})
export class AppComponent {
  title = 'app';
  constructor(private authService: AuthService, private apiService :ApiService){
    console.log("app erzeugt");
  }
}
