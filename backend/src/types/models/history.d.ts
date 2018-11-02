import { Document } from 'mongoose';

export interface IHistoryModel extends Document {
    products: [{
        name: string,
        price: number
    }],
    orderDate: Date,
    totalPrice: number
}