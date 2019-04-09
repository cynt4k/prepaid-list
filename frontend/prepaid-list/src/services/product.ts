import { injectable } from 'inversify';
import { map } from 'rxjs/operators';
import { IProductService, IApiService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IProductModel } from '@/interfaces/services';
import { Observable } from 'rxjs';

@injectable()
export class ProductService implements IProductService {
    private _api: IApiService;

    constructor() {
        this._api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
    }

    public getProducts(): Observable<IProductModel[]> {
        return this._api.get<IProductModel[]>(`info/products`, true).pipe(
            map((res) => res.data)
        );
    }
}
