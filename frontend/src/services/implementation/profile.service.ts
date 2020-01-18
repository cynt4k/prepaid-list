import { IProfileService } from '@/services/types/profile.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Factory from '../factory';
import { IBalanceUpdateModel, IUserModel, IResponse } from '@/services/entities/api';

export class ProfileService implements IProfileService {
  public addBalance(balance: IBalanceUpdateModel): Observable<IUserModel> {
    return Factory.getInstance().ApiService
      .put<IUserModel>('profile/balance', balance, true)
      .pipe(map((res: IResponse<any>) => res.data));
  }
}
