import { injectable } from 'inversify';
import { map } from 'rxjs/operators';
import { IProductService, IApiService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IProductModel, ICategoryModel } from '@/interfaces/services';
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

    public getProductsByCategory(category: string): Observable<IProductModel[]> {
        return this._api.get<IProductModel[]>(`info/categories/${category}`, true).pipe(
            map((res) => res.data)
        );
    }

    public getCategories(): Observable<ICategoryModel[]> {
        return this._api.get<ICategoryModel[]>(`info/categories`, true).pipe(
            map((res) => res.data)
        );
    }
}
