import { IProductModel, ICategoryModel } from '@/services/entities/api';
import { Observable } from 'rxjs';

export interface IProductService {
    getProducts(): Observable<IProductModel[]>;
    getProductsByCategory(category: string): Observable<IProductModel[]>;
    getCategories(): Observable<ICategoryModel[]>;
}
