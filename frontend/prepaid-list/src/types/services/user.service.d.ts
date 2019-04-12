import { Observable } from 'rxjs';
import { IUser, IResponseToken, IUserRegister } from '@/interfaces/services';

export interface IUserService {
    getAllUser(): Observable<IUser[]>;
    loginUserByUsername(username: string): Observable<IResponseToken>;
    registerUser(user: IUserRegister): Observable<IResponseToken>;
}