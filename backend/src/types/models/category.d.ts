import { Document, Types } from 'mongoose';

export interface ICategoryModel extends Document {
    products: [
        {
            name: string
        }
    ],
    price: number
}