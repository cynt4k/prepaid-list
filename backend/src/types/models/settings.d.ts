import { Document, Types } from 'mongoose';

export interface ISettingsModel extends Document {
    prepaidMinBalance: number;
}
