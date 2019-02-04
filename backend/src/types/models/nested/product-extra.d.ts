import { Document, Types } from 'mongoose';
import { ITranslation } from '../translation'; 

export interface IProductExtra extends Document {
    name: ITranslation;
    icon: string;
    price: number;
}
