import { Document, Types } from 'mongoose';

export interface IProductOrder extends Document {
    productId: Types.ObjectId,
    price: Number,
    totalPrice: Number,
    quantity: Number    
}