import { injectable } from 'inversify';
import { IProfileService } from '@/types/services/profile.service';
import { IApiService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IUser, IBalanceUpdateModel, IUserModel } from '@/interfaces/services';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@injectable()
export class ProfileService implements IProfileService {
    private _api: IApiService;

    constructor() {
        this._api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
    }

    public addBalance(balance: IBalanceUpdateModel): Observable<IUserModel> {
        return this._api
            .put<IUserModel>(`profile/balance`, balance, true)
            .pipe(map(res => res.data));
    }
}
