import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Factory from '../factory';
import { IProductModel, ICategoryModel, IResponse } from '@/services/entities/api';
import { IProductService } from '@/services/types/product.service';

export class ProductService implements IProductService {
  public getProducts(): Observable<IProductModel[]> {
    const a = Factory.getInstance().ApiService.get<IProductModel[]>('info/products', true);
    return a.pipe(
      map((res: IResponse<IProductModel[]>) => res.data)
    );
  }

  public getProductsByCategory(category: string): Observable<IProductModel[]> {
    return Factory.getInstance().ApiService.get<IProductModel[]>(`info/category/${category}/products`, true).pipe(
      map((res: IResponse<any>) => res.data)
    );
  }

  public getCategories(): Observable<ICategoryModel[]> {
    return Factory.getInstance().ApiService.get<ICategoryModel[]>('info/categories', true).pipe(
      map((res: IResponse<any>) => res.data)
    );
  }
}
