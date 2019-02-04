import mongoose, { Model, model } from 'mongoose';
import { ISettingsModel } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const settingsSchema = new mongoose.Schema({
    prepaidMinBalance: { type: Number, default: 0, required: true }
});

settingsSchema.plugin(mongooseHistory);
settingsSchema.plugin(mongooseTimestamp);

export const User: Model<ISettingsModel> = mongoose.model<ISettingsModel>('Settings', settingsSchema, 'settings');
