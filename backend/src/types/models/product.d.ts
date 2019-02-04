import { Document } from 'mongoose';
import { ITranslation } from './translation';
import { IProductExtra } from './nested/product-extra';


export interface IProductModel extends Document {
    name: ITranslation;
    barcode: number;
    icon: string;
    price: number;
    extras: IProductExtra[];
}
