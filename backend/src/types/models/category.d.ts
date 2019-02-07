import { Document, Types } from 'mongoose';
import { IProductModel } from './product';
import { ITimestamp } from './timestamp';
import { ITranslationModel } from './translation';

export interface ICategoryModel extends Document, ITimestamp {
    name: ITranslationModel;
    products: IProductModel[];
    price: number;
}
