import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';
import { ILanguageTranslation } from '../../types/models/nested';

export namespace TranslationValidator {

    export const createTranslation = (): RequestHandler[] => {
        return [
            check('translations', I18n.VAL_TRANSLATION_MISSING).isArray().custom((arr: ILanguageTranslation[]) => {
                const missingAttribute = arr.filter((value) => {
                    if (!value.languageCode || !value.name) {
                        return false;
                    }
                });

                if (missingAttribute.length !== 0) {
                    return false;
                }
                return true;
            }),
            check('type', I18n.VAL_TRANSLATION_TYPE_MISSING).isString(),
            ErrorHandler.validateBody
        ];
    };
}
