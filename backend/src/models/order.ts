import mongoose, { Model, Schema } from 'mongoose';
import { IOrderModel } from '../types/models';
import { productSchema } from './product';
import mongooseTimestamp from 'mongoose-timestamp';

const orderSchema = new mongoose.Schema({
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    totalPrice: { type: Number, required: true }
});

orderSchema.plugin(mongooseTimestamp);

export const Order: Model<IOrderModel> = mongoose.model<IOrderModel>('Order', orderSchema, 'order');
