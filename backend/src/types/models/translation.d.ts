import { Document, Types } from 'mongoose';
import { ILanguageTranslation } from './nested/language-translation';
import { ITimestamp } from './timestamp';

export interface ITranslationModel extends Document, ITimestamp {
    translations: ILanguageTranslation[];
}
