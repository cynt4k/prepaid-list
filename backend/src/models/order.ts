import mongoose, { Model, Schema } from 'mongoose';
import { IOrderModel } from '../types/models';

const orderSchema = new mongoose.Schema({
    products: [{
        productId: { type: Schema.Types.ObjectId },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true }
    }],
    user: { type: Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true }
});

export const Order: Model<IOrderModel> = mongoose.model<IOrderModel>('Order', orderSchema, 'order');
