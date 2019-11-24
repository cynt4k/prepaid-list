import { IOrderService } from '@/types/services/order.service';
import { IApiService } from '@/types';
import { IOrder, INewOrder, IApiResponse } from '@/interfaces/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Factory from './factory';

export class OrderService implements IOrderService {
  public placeOrder(order: INewOrder): Observable<IOrder> {
    return Factory.getInstance().ApiService
      .post<IOrder>('order', order, true)
      .pipe(map((res: IApiResponse<any>) => res.data));
  }
}
