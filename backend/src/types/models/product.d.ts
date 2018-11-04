import { Document } from 'mongoose';

export interface IProductModel extends Document {
    name: String,
    barcode: Number
}