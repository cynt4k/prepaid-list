import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ITranslationModel, LanguageCode } from '../types/models';
import mongooseTimestamp from 'mongoose-timestamp';

const languageTranslationSchema = {
    languageCode: { type: LanguageCode, required: true },
    name: {type: String, required: true },
    shortname: { type: String }
};

export const translationSchema = new mongoose.Schema({
    translations: [languageTranslationSchema]
});

translationSchema.plugin(mongooseTimestamp);

export const Translation: Model<ITranslationModel> = mongoose.model<ITranslationModel>('Translation', translationSchema, 'translation');
