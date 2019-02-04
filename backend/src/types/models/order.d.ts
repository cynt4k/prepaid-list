import { Document, Types } from 'mongoose';
import { IProductModel } from './product';
import { IProductOrder } from './nested/product-order'
import { ITimestamp } from './timestamp';

export interface IOrderModel extends Document, ITimestamp {
    products: IProductOrder[];
    user: Types.ObjectId;
    totalPrice: number;
}
