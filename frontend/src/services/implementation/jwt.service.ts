import jwtDecode from 'jwt-decode';
import { IJwtService } from '@/services/types/jwt.service';

export class JwtService implements IJwtService {
  public getToken() {
    return window.localStorage['token'];
  }

  public getRefreshToken() {
    return window.localStorage['refreshToken'];
  }

  public saveToken(token: string) {
    window.localStorage['token'] = token;
  }

  public saveRefreshToken(refreshToken: string) {
    window.localStorage['refreshToken'] = refreshToken;
  }

  public destroyToken() {
    window.localStorage.removeItem('token');
  }

  public destroyRefreshToken() {
    window.localStorage.removeItem('refreshToken');
  }

  public decodeToken(token: string) {
    return jwtDecode(token);
  }
}
