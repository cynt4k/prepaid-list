import { IProductModel, ICategoryModel } from '@/interfaces/services';
import { Observable } from 'rxjs';

export interface IProductService {
    getProducts(): Observable<IProductModel[]>;
    getCategories(): Observable<ICategoryModel[]>;
}
