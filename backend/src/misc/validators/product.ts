import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';
import { IProductOrder, IProductExtra } from '../../types/models/nested';
import { IconValidator } from './icon';

export namespace ProductValidator {
    export const createCategory = (): RequestHandler[] => {
        return [
            check('name', I18n.VAL_CATEGORY_NAME_NOT_VALID).isString(),
            check('icon', I18n.VAL_CATEGORY_ICON_NOT_VALID).optional().isString().custom(IconValidator.validate),
            ErrorHandler.validateBody
        ];
    };

    export const createProduct = (): RequestHandler[] => {
        return [
            check('name', I18n.VAL_PRODUCT_NAME_NOT_VALID).isString(),
            check('barcode', I18n.VAL_PRODUCT_BARCODE_NOT_VALID).isString(),
            check('price', I18n.VAL_PRODUCT_PRICE_NOT_VALID).isNumeric(),
            check('extras', I18n.VAL_PRODUCT_EXTRAS_NOT_VALID).optional().isArray().custom((extras: IProductExtra[]) => {
                return extras.every((extra) => {
                    if (!extra.name || !extra.price) {
                        return false;
                    }
                    return true;
                });
            }),
            check('icon').optional().isString().custom(IconValidator.validate),
            ErrorHandler.validateBody
        ];
    };
}
