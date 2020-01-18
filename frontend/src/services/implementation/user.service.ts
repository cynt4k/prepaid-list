import { map } from 'rxjs/operators';
import {
  IApiService
} from '@/services/types/api';
import {
  IUser,
  IResponseToken,
  IUserModel,
  IUserRegister,
  IResponse
} from '@/services/entities/api';
import { Observable } from 'rxjs';
import Factory from '../factory';
import { IUserService } from '@/services/types/user.service';

export class UserService implements IUserService {
    private api: IApiService;

    constructor() {
      this.api = Factory.getInstance().ApiService;
    }

    public getAllUser(): Observable<IUser[]> {
      return this.api
        .get<IUser[]>('user')
        .pipe(map((res: IResponse<any>) => res.data));
    }

    public getUserInfos(): Observable<IUserModel> {
      return this.api
        .get<IUserModel>('profile', true)
        .pipe(map((res: IResponse<any>) => res.data));
    }

    public loginUserByUsername(username: string): Observable<IResponseToken> {
      return this.api
        .post<IResponseToken>('auth/login/user', { username })
        .pipe(map((res: IResponse<any>) => res.data));
    }

    public registerUser(user: IUserRegister): Observable<IResponseToken> {
      return this.api
        .post<IResponseToken>('auth/register', user)
        .pipe(map((res: IResponse<any>) => res.data));
    }
}
