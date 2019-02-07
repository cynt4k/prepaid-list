import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ITranslationModel, LanguageCode, LanguageType } from '../types/models';
import mongooseTimestamp from 'mongoose-timestamp';
import { PrepaidListError } from '../errors';
import { I18n } from '../misc';
import { ErrorCode } from '../types/error';

const languageTranslationSchema = new mongoose.Schema({
    languageCode: { type: LanguageCode, required: true },
    name: {type: String, required: true },
    shortname: { type: String }
}, { _id: false });

export const translationSchema = new mongoose.Schema({
    translations: [languageTranslationSchema],
    type: { type: LanguageType, required: true }
});

translationSchema.pre('validate', function() {
    const newTranslation: ITranslationModel = <ITranslationModel> this;

    const languageArr = newTranslation.translations.map((value) => value.languageCode);
    const duplicatedCode = languageArr.some((item, idx) => {
        return languageArr.indexOf(item) !== idx;
    });
    if (duplicatedCode) {
        throw new PrepaidListError(I18n.ERR_LANGUAGE_CODE_DUPLICATED, ErrorCode.LANGUAGE_CODE_DUPLICATED);
    }
});

translationSchema.plugin(mongooseTimestamp);

export const Translation: Model<ITranslationModel> = mongoose.model<ITranslationModel>('Translation', translationSchema, 'translation');
