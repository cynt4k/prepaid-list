import { response } from './response';
import { HttpCodes } from './codes';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export let unkownRouteHandler = (req: Request, res: Response, next: NextFunction) => {
    return response(res, HttpCodes.NotFound, `${req.method} - ${req.path} not found`);
};
