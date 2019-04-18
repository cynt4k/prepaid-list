import { injectable } from 'inversify';
import { map } from 'rxjs/operators';
import { IProductService, IApiService, IUserService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IUser, IResponseToken, IUserModel } from '@/interfaces/services';
import { Observable } from 'rxjs';

@injectable()
export class UserService implements IUserService {
    private _api: IApiService;

    constructor() {
        this._api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
    }

    public getAllUser(): Observable<IUser[]> {
        return this._api.get<IUser[]>('user').pipe(
            map((res) => res.data)
        );
    }

    public getUserInfos(): Observable<IUserModel> {
        return this._api.get<IUserModel>('profile', true).pipe(
            map((res) => res.data)
        );
    }


    public loginUserByUsername(username: string): Observable<IResponseToken> {
        return this._api.post<IResponseToken>('auth/login/user', { username }).pipe(
            map((res) => res.data)
        );
    }
}