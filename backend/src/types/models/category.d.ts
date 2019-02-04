import { Document, Types } from 'mongoose';
import { IProductModel } from './product';

export interface ICategoryModel extends Document {
    products: IProductModel[];
    price: number;
}
