import { Document } from 'mongoose';
import { ITimestamp } from './timestamp';
import { IUserModel } from './user';

export interface IBalanceModel extends Document, ITimestamp {
    user: IUserModel;
    balance: number;
    amount: number;
}