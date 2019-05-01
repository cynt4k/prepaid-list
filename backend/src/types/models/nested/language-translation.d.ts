import { Document, Types } from 'mongoose';
import { LanguageCode } from '../language-code';

export interface ILanguageTranslation extends Document {
    languageCode: LanguageCode;
    name: string;
    shortname: string;
}