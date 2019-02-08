import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';
import { IProductOrder, IProductExtra } from '../../types/models/nested';

export namespace ProductValidator {
    export const createCategory = (): RequestHandler[] => {
        return [
            check('name').isString(),
            check('icon', I18n.VAL_CATEGORY_ICON_NOT_VALID).optional().isString().custom((icon: string) => {
                const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
                const data = icon.match(reg);
                if (!data) return false;
                if (data.length !== 3) return false;
                return true;
            }),
            ErrorHandler.validateBody
        ];
    };

    export const createProduct = (): RequestHandler[] => {
        return [
            check('name').isString(),
            check('barcode').isString(),
            check('price').isNumeric(),
            check('extras').optional().isArray().custom((extras: IProductExtra[]) => {
                return extras.every((extra) => {
                    if (!extra.name || !extra.price) {
                        return false;
                    }
                    return true;
                });
            }),
            ErrorHandler.validateBody
        ];
    };
}
