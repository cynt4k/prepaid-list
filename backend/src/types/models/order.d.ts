import { Document, Types, Schema } from 'mongoose';
import { IProductModel } from './product';
import { IProductOrder } from './nested/product-order'
import { ITimestamp } from './timestamp';
import { IUserModel } from './user';

export interface IOrderModel extends Document, ITimestamp {
    products: IProductOrder[];
    user: IUserModel;
    totalPrice: number;
}
