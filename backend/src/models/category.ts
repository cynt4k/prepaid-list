import mongoose, { Model } from 'mongoose';
import { ICategoryModel, ITranslationModel } from '../types/models';
import { translationSchema } from './translation';
import mongooseTimestamp from 'mongoose-timestamp';


const categoryModel = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'translation', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }],
    icon: { type: String }
});

categoryModel.plugin(mongooseTimestamp);

export const Category: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categoryModel, 'category');
