import { Document, Types } from 'mongoose';
import { IProductExtraOrder } from './product-extra-order';

export interface IProductOrder {
    productId: Types.ObjectId;
    price: number;
    totalPrice: number;
    quantity: number;
    extras?: IProductExtraOrder[]
}
