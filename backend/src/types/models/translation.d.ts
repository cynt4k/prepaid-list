import { Document, Types } from 'mongoose';
import { ILanguageTranslation } from './nested/language-translation';
import { ITimestamp } from './timestamp';
import { LanguageType } from './languate-type';

export interface ITranslationModel extends Document, ITimestamp {
    translations: ILanguageTranslation[];
    type: LanguageType;
}
