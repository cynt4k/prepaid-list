import { Document, Types } from 'mongoose';
import { ILanguageTranslation } from './nested/language-translation';

export interface ITranslation extends Document {
    translations: ILanguageTranslation[];
}
