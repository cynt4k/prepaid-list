import { Observable } from 'rxjs';
import { IUser, IResponseToken, IUserModel, IUserRegister } from '@/services/entities/api';

export interface IUserService {
    getAllUser(): Observable<IUser[]>;
    loginUserByUsername(username: string): Observable<IResponseToken>;
    getUserInfos(): Observable<IUserModel>;
    registerUser(user: IUserRegister): Observable<IResponseToken>;
    loginUserByToken(token: string): Observable<IResponseToken>;
}
