import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ICategoryModel, IProductModel, ITranslationModel } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';

const productExtraSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'translation', required: true },
    icon: { type: String },
    price: { type: Number, required: true }
});

export const productSchema = new mongoose.Schema({
    name: { type: Schema.Types.ObjectId, ref: 'translation', required: true },
    barcode: { type: Number, required: true, unique: true },
    icon: { type: String },
    price: { type: Number, required: true },
    extras: [productExtraSchema]
});

productSchema.plugin(mongooseHistory);
productSchema.plugin(mongooseTimestamp);

export const Product: Model<IProductModel> = mongoose.model<IProductModel>('Product', productSchema, 'product');
