import { Observable } from 'rxjs';
import { INewOrder, IOrder } from '@/services/entities/api';

export interface IOrderService {
    placeOrder(order: INewOrder): Observable<IOrder>;
}
