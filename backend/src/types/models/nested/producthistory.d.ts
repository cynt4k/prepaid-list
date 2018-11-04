import { Types } from 'mongoose';

export interface IProductHistory {
    id: Types.ObjectId,
    price: Number,
    totalPrice: Number,
    quantity: Number    
}