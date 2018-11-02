import mongoose, { Model } from 'mongoose';
import { ICategoryModel } from '../types/models';

const categoryModel = new mongoose.Schema({
    products: [{
        name: { type: String, required: true }
    }],
    price: { type: Number, required: true }
});

export const Category: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categoryModel, 'category');