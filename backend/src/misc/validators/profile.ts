import { RequestHandler } from 'express';
import { body, check } from 'express-validator/check';
import { I18n } from '../template';
import { ErrorHandler } from '../../core/express';

export namespace ProfileValidator {

    export const updateUser = (): RequestHandler[] => {
        return [
            check('balance', I18n.VAL_USER_BALANCE_EXIST).not().exists(),
            check('active', I18n.VAL_USER_ACTIVE_EXIST).not().exists(),
            check('username', I18n.VAL_USER_USERNAME_EXIST).not().exists(),
            check('role', I18n.VAL_USER_ROLE_EXIST).not().exists(),
            ErrorHandler.validateBody
        ];
    };
}
