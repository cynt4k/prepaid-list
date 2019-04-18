import { Observable } from 'rxjs';
import { IUser, IResponseToken, IUserModel } from '@/interfaces/services';

export interface IUserService {
    getAllUser(): Observable<IUser[]>;
    loginUserByUsername(username: string): Observable<IResponseToken>;
    getUserInfos(): Observable<IUserModel>;
}