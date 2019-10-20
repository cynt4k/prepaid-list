import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { IOrderModel, IUserModel, AclRight, IProductExtraOrder } from '../types/models';
import { ErrorCode } from '../types/error';
import { CheckAcl } from '../core/acl';
import { User } from './user';
import { PrepaidListError } from '../errors';
import { Settings } from './settings';
import { Template, I18n } from '../misc/template';
import mongooseTimestamp from 'mongoose-timestamp';

const orderExtraSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product.extras' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

const orderProductSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    extras: [orderExtraSchema]
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

const orderSchema = new mongoose.Schema({
    products: [orderProductSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, required: true }
}, { toJSON: { transform: function(doc, ret: IOrderModel, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

orderSchema.pre('validate', async function() {
    const newDocument: IOrderModel = <IOrderModel> this;
    try {
        const user = await User.findById(newDocument.user).exec() as IUserModel;
        const isPrepaid = await CheckAcl.isAllowed(newDocument.user.id, AclRight.PREPAID_ALLOW);
        const settings = await Settings.find().exec();
        const minAllowedBalance = isPrepaid ? -1 * Math.abs(settings[0]!.prepaidMinBalance) : 0;

        if (user.balance - newDocument.totalPrice < minAllowedBalance) {
            throw new PrepaidListError(I18n.ERR_LOW_BALANCE, ErrorCode.LOW_BALANCE);
        }
    } catch (e) {
        throw e;
    }
});

orderSchema.plugin(mongooseTimestamp);

export const Order: Model<IOrderModel> = mongoose.model<IOrderModel>('Order', orderSchema, 'order');
