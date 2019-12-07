import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Factory from '@/services/factory';
import { IOrderService } from '@/services/types/order.service';
import { INewOrder, IOrder, IResponse } from '@/services/entities/api';

export class OrderService implements IOrderService {
  public placeOrder(order: INewOrder): Observable<IOrder> {
    return Factory.getInstance().ApiService
      .post<IOrder>('order', order, true)
      .pipe(map((res: IResponse<any>) => res.data));
  }
}
