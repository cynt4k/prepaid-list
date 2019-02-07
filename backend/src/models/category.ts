import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ICategoryModel, ITranslationModel, LanguageType } from '../types/models';
import { translationSchema, Translation } from './translation';
import mongooseTimestamp from 'mongoose-timestamp';
import mongooseAutopopulate from 'mongoose-autopopulate';
import { PrepaidListError } from '../errors';
import { I18n } from '../misc';
import { ErrorCode } from '../types/error';


const categoryModel = new mongoose.Schema({
    name: { type: Schema.Types.ObjectId, ref: 'Translation', required: true, autopopulate: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    icon: { type: String }
}, { toJSON: { transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
}}});

categoryModel.pre('validate', async function() {
    const newDocument: ICategoryModel = <ICategoryModel> this;
    try {
        const result = await Translation.findById(newDocument.name).where('type').equals(LanguageType.CATEGORY).exec();
        if (!result) throw new PrepaidListError(I18n.ERR_TRANSLATION_NOT_FOUND, ErrorCode.TRANSLATION_NOT_FOUND);
    } catch (e) {
        throw e;
    }
});

categoryModel.plugin(mongooseTimestamp);
categoryModel.plugin(mongooseAutopopulate);

export const Category: Model<ICategoryModel> = mongoose.model<ICategoryModel>('Category', categoryModel, 'category');
