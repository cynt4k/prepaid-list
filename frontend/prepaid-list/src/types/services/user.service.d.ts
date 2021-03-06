import { Observable } from 'rxjs';
import { IUser, IResponseToken, IUserModel, IUserRegister } from '@/interfaces/services';

export interface IUserService {
    getAllUser(): Observable<IUser[]>;
    loginUserByUsername(username: string): Observable<IResponseToken>;
    getUserInfos(): Observable<IUserModel>;
    registerUser(user: IUserRegister): Observable<IResponseToken>;
}