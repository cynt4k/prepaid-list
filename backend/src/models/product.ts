import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ICategoryModel, IProductModel, ITranslationModel, LanguageType } from '../types/models';
import mongooseHistory from 'mongoose-history';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { Translation } from './translation';
import { PrepaidListError } from '../errors';
import { I18n, IconValidator } from '../misc';
import { MinioClient } from '../core';
import { ErrorCode } from '../types/error';

const productExtraSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Translation', required: true, autopopulate: true },
    icon: { type: String },
    price: { type: Number, required: true }
}, { _id: false });

export const productSchema = new mongoose.Schema({
    name: { type: Schema.Types.ObjectId, ref: 'Translation', required: true, autopopulate: true },
    barcode: { type: String, required: true, unique: true },
    icon: { type: String },
    price: { type: Number, required: true },
    extras: [productExtraSchema]
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

productSchema.pre('validate', async function() {
    const newDocument: IProductModel = <IProductModel> this;
    if (newDocument.icon) {
        if (!IconValidator.validate(newDocument.icon)) {
            throw new PrepaidListError(I18n.ERR_ICON_NOT_VALID, ErrorCode.ICON_NOT_VALID);
        }
    }
    try {
        const result = await Translation.findById(newDocument.name).where('type').equals(LanguageType.PRODUCT).exec();
        if (!result) throw new PrepaidListError(I18n.ERR_TRANSLATION_NOT_FOUND, ErrorCode.TRANSLATION_NOT_FOUND);
    } catch (e) {
        throw e;
    }
});

productSchema.pre('save', async function() {
    const newDocument: IProductModel = <IProductModel> this;
    try {
        if (newDocument.icon) {
            const url = await MinioClient.putIcon(newDocument.icon, this.id);
            newDocument.icon = `${newDocument.id}.${IconValidator.getFileType(newDocument.icon)}`;
            return Promise.resolve();
        }
        return Promise.resolve();
    } catch (e) {
        newDocument.icon = '';
        console.warn(`Could not save image`);
        return Promise.resolve();
    }
});

productSchema.post('find', async function(results: any) {
    let docs: IProductModel[] = <IProductModel[]> results;
    try {
        const docsPromise = docs.map(async (doc) => {
            if (doc.icon) {
                const url = await MinioClient.getIconUrl(doc.icon);
                if (!url) doc.icon = I18n.ERR_ICON_NOT_FOUND;
                doc.icon = url;
            }
            return Promise.resolve(doc);
        });
        docs = await Promise.all(docsPromise);
        const test = docs;
    } catch (e) {
        throw e;
    }
});

productSchema.plugin(mongooseHistory);
productSchema.plugin(mongooseTimestamp);
productSchema.plugin(mongooseAutopopulate);

export const Product: Model<IProductModel> = mongoose.model<IProductModel>('Product', productSchema, 'product');
