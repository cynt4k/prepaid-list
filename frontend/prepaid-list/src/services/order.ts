import { IOrderService } from '@/types/services/order.service';
import { IApiService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { IOrder, INewOrder, IApiResponse } from '@/interfaces/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { injectable } from 'inversify';

@injectable()
export class OrderService implements IOrderService {
    private api: IApiService;

    constructor() {
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
    }

    public placeOrder(order: INewOrder): Observable<IOrder> {
        return this.api
            .post<IOrder>(`order`, order, true)
            .pipe(map((res: IApiResponse<any>) => res.data));
    }
}
