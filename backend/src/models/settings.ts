import { Model, model } from 'mongoose';
import mongoose from 'mongoose';
import { ISettingsModel } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const settingsSchema = new mongoose.Schema({
    prepaidMinBalance: { type: Number, default: 0, required: true }
}, { capped: { max: 1 }, toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

settingsSchema.plugin(mongooseHistory);
settingsSchema.plugin(mongooseTimestamp);

export const Settings: Model<ISettingsModel> = mongoose.model<ISettingsModel>('Settings', settingsSchema, 'settings');
