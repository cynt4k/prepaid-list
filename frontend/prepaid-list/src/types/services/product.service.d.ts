import { IProductModel } from '@/interfaces/services';
import { Observable } from 'rxjs';

export interface IProductService {
    getProducts(): Observable<IProductModel[]>;
}
