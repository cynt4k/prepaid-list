import { map } from 'rxjs/operators';
import { IProductService, IApiService } from '@/types';
import { IProductModel, ICategoryModel, IResponse, IApiResponse } from '@/interfaces/services';
import { Observable } from 'rxjs';
import Factory from './factory';

export class ProductService implements IProductService {
  public getProducts(): Observable<IProductModel[]> {
    return Factory.getInstance().ApiService.get<IProductModel[]>('info/products', true).pipe(
      map((res: IApiResponse<any>) => res.data)
    );
  }

  public getProductsByCategory(category: string): Observable<IProductModel[]> {
    return Factory.getInstance().ApiService.get<IProductModel[]>(`info/category/${category}/products`, true).pipe(
      map((res: IApiResponse<any>) => res.data)
    );
  }

  public getCategories(): Observable<ICategoryModel[]> {
    return Factory.getInstance().ApiService.get<ICategoryModel[]>('info/categories', true).pipe(
      map((res: IApiResponse<any>) => res.data)
    );
  }
}
