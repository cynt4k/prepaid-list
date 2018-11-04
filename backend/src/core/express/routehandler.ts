import { response } from './response';
import { HttpCodes } from './codes';
import { Response, NextFunction, ErrorRequestHandler } from 'express';
import { Request } from '../../types/express';

export let unkownRouteHandler = (req: Request, res: Response, next: NextFunction) => {
    return response(res, HttpCodes.NotFound, `${req.method} - ${req.path} not found`);
};