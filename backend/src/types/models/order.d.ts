import { Document, Types } from 'mongoose';
import { IProductModel } from './product';
import { IProductOrder } from './nested/product-order'

export interface IOrderModel extends Document {
    products: IProductOrder[];
    user: Types.ObjectId;
    totalPrice: number;
}
