import { Document, Types } from 'mongoose';

export interface IProductExtraOrder {
    productId: Types.ObjectId;
    price: number;
    totalPrice: number;
    quantity: number;
}