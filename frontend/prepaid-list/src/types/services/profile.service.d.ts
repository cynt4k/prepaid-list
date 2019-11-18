import { IBalanceUpdateModel, IUser, IUserModel } from '@/interfaces/services';
import { Observable } from 'rxjs';

export interface IProfileService {
    addBalance(balance: IBalanceUpdateModel): Observable<IUserModel>;
}
