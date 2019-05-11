import { response } from './response';
import { HttpCodes } from './codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import { TypeError } from '../../errors/express';
import { I18n } from '../../misc';

export const errorHandler: ErrorRequestHandler = (e: any, req: Request, res: Response, next: NextFunction) => {
    if (e instanceof TypeError) {
        return response(res, HttpCodes.NotAcceptable, e.message, e.params);
    }
    if (e instanceof Error) {
        return response(res, HttpCodes.InternalServerError, e.message);
    } else {
        return response (res, HttpCodes.InternalServerError, e);
    }
};

export namespace ErrorHandler {
    export const defaultError: ErrorRequestHandler = (e: any, req: Request, res: Response, next: NextFunction) => {
        if (e instanceof Error) {
            return response(res, HttpCodes.InternalServerError, e.message);
        } else {
            return response (res, HttpCodes.InternalServerError, e);
        }
    };

    export const validateBody = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new TypeError(I18n.WARN_INVALID_PARAMS, errors.array()));
        }
        return next();
    };
}
