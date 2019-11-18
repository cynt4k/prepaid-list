import { injectable } from 'inversify';
import { map } from 'rxjs/operators';
import { IProductService, IApiService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IProductModel, ICategoryModel, IResponse, IApiResponse } from '@/interfaces/services';
import { Observable } from 'rxjs';

@injectable()
export class ProductService implements IProductService {
    private api: IApiService;

    constructor() {
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
    }

    public getProducts(): Observable<IProductModel[]> {
        return this.api.get<IProductModel[]>(`info/products`, true).pipe(
            map((res: IApiResponse<any>) => res.data)
        );
    }

    public getProductsByCategory(category: string): Observable<IProductModel[]> {
        return this.api.get<IProductModel[]>(`info/category/${category}/products`, true).pipe(
            map((res: IApiResponse<any>) => res.data)
        );
    }

    public getCategories(): Observable<ICategoryModel[]> {
        return this.api.get<ICategoryModel[]>(`info/categories`, true).pipe(
            map((res: IApiResponse<any>) => res.data)
        );
    }
}
