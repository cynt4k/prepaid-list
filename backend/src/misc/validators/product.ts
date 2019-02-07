import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';
import { IProductOrder } from '../../types/models/nested';

export namespace ProductValidator {
    export const createCategory = (): RequestHandler[] => {
        return [
            check('name').isString(),
            ErrorHandler.validateBody
        ];
    };
}
