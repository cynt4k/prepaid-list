import { RequestHandler } from 'express-serve-static-core';
import { body, check } from 'express-validator/check';
import { ErrorHandler } from '../../core/express';
import { I18n } from '../template';

export namespace AuthValidator {

    export const validateRegister = (): RequestHandler[] => {
        return [
            check('username', I18n.VAL_REGISTER_USERNAME_NOT_PROVIDED).isString(),
            check('token', I18n.VAL_REGISTER_TOKEN_NOT_VALID).optional().isString(),
            check('email', I18n.VAL_REGISTER_EMAIL_NOT_VALID).isEmail(),
            check('name.firstname', I18n.VAL_REGISTER_FIRSTNAME_NOT_PROVIDED).isString(),
            check('name.lastname', I18n.VAL_REGISTER_LASTNAME_NOT_PROVIDED).isString(),
            ErrorHandler.validateBody
        ];
    };
}
