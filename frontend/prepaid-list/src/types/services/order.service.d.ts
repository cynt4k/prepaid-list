import { Observable } from 'rxjs';
import { IOrder, INewOrder } from '@/interfaces/services';

export interface IOrderService {
    placeOrder(order: INewOrder): Observable<IOrder>;
}
