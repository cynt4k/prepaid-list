import mongoose, { Model } from 'mongoose';
import { ICategoryModel } from '../types/models';
import { productModel } from './product';


const categoryModel = new mongoose.Schema({
    products: [productModel],
    price: { type: Number, required: true }
});

export const Category: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categoryModel, 'category');