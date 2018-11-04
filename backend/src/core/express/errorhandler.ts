import { response } from './response';
import { HttpCodes } from './codes';
import { Response, NextFunction, ErrorRequestHandler,  } from 'express';
import { validationResult } from 'express-validator/check';
import { TypeError } from '../../errors/express';
import { Request } from '../../types/express';

export let errorHandler: ErrorRequestHandler = (e: any, req: Request, res: Response, next: NextFunction) => {
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
    export let defaultError: ErrorRequestHandler = (e: any, req: Request, res: Response, next: NextFunction) => {
        if (e instanceof Error) {
            return response(res, HttpCodes.InternalServerError, e.message);
        } else {
            return response (res, HttpCodes.InternalServerError, e);
        }
    };

    export let validateBody = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new TypeError('Invalid params', errors.array()));
        }
        return next();
    };
}