import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ICategoryModel, IProductModel, ITranslationModel, LanguageType } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';
import { Translation } from './translation';
import { PrepaidListError } from '../errors';
import { I18n } from '../misc';
import { ErrorCode } from '../types/error';

const productExtraSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Translation', required: true },
    icon: { type: String },
    price: { type: Number, required: true }
}, { _id: false });

export const productSchema = new mongoose.Schema({
    name: { type: Schema.Types.ObjectId, ref: 'Translation', required: true },
    barcode: { type: String, required: true, unique: true },
    icon: { type: String },
    price: { type: Number, required: true },
    extras: [productExtraSchema]
});

productSchema.pre('validate', async function() {
    const newDocument: IProductModel = <IProductModel> this;
    try {
        const result = await Translation.findById(newDocument.name).where('type').equals(LanguageType.PRODUCT).exec();
        if (!result) throw new PrepaidListError(I18n.ERR_TRANSLATION_NOT_FOUND, ErrorCode.TRANSLATION_NOT_FOUND);
    } catch (e) {
        throw e;
    }
});

productSchema.plugin(mongooseHistory);
productSchema.plugin(mongooseTimestamp);

export const Product: Model<IProductModel> = mongoose.model<IProductModel>('Product', productSchema, 'product');
