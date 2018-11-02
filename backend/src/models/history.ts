import mongoose, { Model } from 'mongoose';
import { IHistoryModel } from '../types/models';

const historySchema = new mongoose.Schema({
    products: [{
        name: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true }
});

export const History: Model<IHistoryModel> = mongoose.model<IHistoryModel>('History', historySchema, 'history');
