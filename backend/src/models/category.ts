import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ICategoryModel, ITranslationModel } from '../types/models';
import { translationSchema } from './translation';
import mongooseTimestamp from 'mongoose-timestamp';


const categoryModel = new mongoose.Schema({
    name: { type: Schema.Types.ObjectId, ref: 'translation', required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    icon: { type: String }
});

categoryModel.plugin(mongooseTimestamp);

export const Category: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categoryModel, 'category');
