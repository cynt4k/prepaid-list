import { Document } from 'mongoose';
import { ITranslationModel } from './translation';
import { IProductExtra } from './nested/product-extra';
import { ITimestamp } from './timestamp';


export interface IProductModel extends Document, ITimestamp {
    name: ITranslationModel;
    barcode: string;
    icon: string;
    price: number;
    extras: IProductExtra[];
}
