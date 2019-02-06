import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';

export namespace OrderValidator {

    export const newOrder = (): RequestHandler[]  => {
        return [
            check('user', I18n.WARN_USER_NOT_PROVIDED).exists(),
            check('products', I18n.WARN_PRODUCTS_NOT_PROVIDED).exists(),
            check('totalPrice', I18n.WARN_TOTALPRICE_NOT_PROVIDED).exists(),
            ErrorHandler.validateBody
        ];
    };
}
