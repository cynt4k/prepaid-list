import { IBalanceUpdateModel, IUser, IUserModel } from '@/services/entities/api';
import { Observable } from 'rxjs';

export interface IProfileService {
    addBalance(balance: IBalanceUpdateModel): Observable<IUserModel>;
}
