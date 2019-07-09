import { injectable } from 'inversify';
import { map } from 'rxjs/operators';
import {
    IProductService,
    IApiService,
    IUserService,
    IJwtService,
} from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import {
    IUser,
    IResponseToken,
    IUserModel,
    IUserRegister,
    IApiResponse,
} from '@/interfaces/services';
import { Observable } from 'rxjs';

@injectable()
export class UserService implements IUserService {
    private api: IApiService;
    jwt: IJwtService;

    constructor() {
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
    }

    public getAllUser(): Observable<IUser[]> {
        return this.api
            .get<IUser[]>('user')
            .pipe(map((res: IApiResponse<any>) => res.data));
    }

    public getUserInfos(): Observable<IUserModel> {
        return this.api
            .get<IUserModel>('profile', true)
            .pipe(map((res: IApiResponse<any>) => res.data));
    }

    public loginUserByUsername(username: string): Observable<IResponseToken> {
        let a = this.api
            .post<IResponseToken>('auth/login/user', { username })
            .pipe(map((res: IApiResponse<any>) => res.data));
        // let j = this.jwt;
        // debugger;
        return a;
    }
    public registerUser(user: IUserRegister): Observable<IResponseToken> {
        return this.api
            .post<IResponseToken>('auth/register', user)
            .pipe(map((res: IApiResponse<any>) => res.data));
    }
}
