import { Document, Types } from 'mongoose';
import { IProductModel } from './product';
import { ITimestamp } from './timestamp';

export interface ICategoryModel extends Document, ITimestamp {
    products: IProductModel[];
    price: number;
}
