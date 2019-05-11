import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IBalanceModel } from '../types/models';
import mongooseTimestamp from 'mongoose-timestamp';

const balanceSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, required: true },
    amount: { type: Number, required: true }
});

balanceSchema.plugin(mongooseTimestamp);

export const Balance: Model<IBalanceModel> = mongoose.model<IBalanceModel>('Balance', balanceSchema, 'balance');
