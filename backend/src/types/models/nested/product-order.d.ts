import { Document, Types } from 'mongoose';

export interface IProductOrder {
    productId: Types.ObjectId,
    price: number,
    totalPrice: number,
    quantity: number    
}