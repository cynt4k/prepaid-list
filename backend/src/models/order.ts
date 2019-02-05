import mongoose, { Model, Schema } from 'mongoose';
import { IOrderModel, IUserModel, AclRight } from '../types/models';
import { ErrorCode } from '../types/error';
import { AclCheck } from '../core/acl';
import { productSchema } from './product';
import { User } from './user';
import { PrepaidListError } from '../errors';
import { Settings } from './settings';
import { Template } from '../misc/template';
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

orderSchema.pre('validate', async function() {
    const newDocument: IOrderModel = <IOrderModel> this;
    try {
        const user = await User.findById(newDocument.user).exec() as IUserModel;
        const isPrepaid = await AclCheck.isAllowed(newDocument.user, AclRight.PREPAID_ALLOW);
        const settings = await Settings.find().exec();
        if (isPrepaid) {
            if (settings[0]!.prepaidMinBalance < user.balance - newDocument.totalPrice) {
                throw new PrepaidListError(Template.ERROR_LOW_BALANCE(user.id), ErrorCode.LOW_BALANCE);
            }
        } else {
            if (user.balance - newDocument.totalPrice < 0) {
                throw new PrepaidListError(Template.ERROR_LOW_BALANCE(user.id), ErrorCode.LOW_BALANCE);
            }
        }
    } catch (e) {
        throw e;
    }
});

orderSchema.plugin(mongooseTimestamp);

export const Order: Model<IOrderModel> = mongoose.model<IOrderModel>('Order', orderSchema, 'order');
