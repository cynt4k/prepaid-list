import { Document, Types } from 'mongoose';
import { ITranslationModel } from '../translation'; 

export interface IProductExtra extends Document {
    name: ITranslationModel;
    icon: string;
    price: number;
}
