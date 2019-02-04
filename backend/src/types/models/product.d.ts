import { Document } from 'mongoose';
import { ITranslation } from './translation';
import { IProductExtra } from './nested/product-extra';
import { ITimestamp } from './timestamp';


export interface IProductModel extends Document, ITimestamp {
    name: ITranslation;
    barcode: number;
    icon: string;
    price: number;
    extras: IProductExtra[];
}
