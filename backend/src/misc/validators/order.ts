import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';
import { IProductOrder } from '../../types/models/nested';

export namespace OrderValidator {

    export const newOrder = (): RequestHandler[]  => {
        return [
            check('user', I18n.VAL_ORDER_USER_EXIST).not().exists(),
            check('products', I18n.VAL_ORDER_PRODUCTS_NOT_PROVIDED).isArray().custom((arr: IProductOrder[]) => {
                return arr.every((elem) => {
                    if (!elem.productId || !elem.quantity) {
                        return false;
                    }
                    if (elem.quantity <= 0) {
                        return false;
                    }
                    if (elem.extras) {
                        const extraValid = elem.extras.every((extra) => {
                            if (!extra.productId || !elem.quantity) {
                                return false;
                            }
                            if (extra.quantity <= 0) {
                                return false;
                            }
                            return true;
                        });
                        if (!extraValid) {
                            return false;
                        }
                    }
                    return true;
                });
            }),
            check('totalPrice', I18n.VAL_ORDER_TOTALPRICE_PROVIDED).not().exists(),
            ErrorHandler.validateBody
        ];
    };
}
