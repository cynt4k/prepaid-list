import { Document, Types } from 'mongoose';
import { IProductModel } from './product';
import { IProductHistory } from './nested';

export interface IHistoryModel extends Document {
    user: Types.ObjectId,
    products: IProductHistory[],
    orderDate: Date,
    totalPrice: number
}