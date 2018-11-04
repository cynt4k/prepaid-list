import mongoose, { Model } from 'mongoose';
import { ICategoryModel, IProductModel } from '../types/models';

export const productModel = new mongoose.Schema({
    name: { type: String, required: true },
    barcode: { type: Number, required: true, unique: true }
});

export const Product: Model<IProductModel> = mongoose.model<IProductModel>('Product', productModel, 'product');
