import mongoose, { Model } from 'mongoose';
import { productModel } from './product';
import { IHistoryModel } from '../types/models';

const historySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    products: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true }
});

export const History: Model<IHistoryModel> = mongoose.model<IHistoryModel>('History', historySchema, 'history');
