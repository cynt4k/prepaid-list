import { IProfileService } from '@/types/services/profile.service';
import { IApiService } from '@/types';
import { IBalanceUpdateModel, IUserModel, IApiResponse } from '@/interfaces/services';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Factory from './factory';

export class ProfileService implements IProfileService {
  public addBalance(balance: IBalanceUpdateModel): Observable<IUserModel> {
    return Factory.getInstance().ApiService
      .put<IUserModel>('profile/balance', balance, true)
      .pipe(map((res: IApiResponse<any>) => res.data));
  }
}
