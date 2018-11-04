import { Response, NextFunction } from 'express';
import { Request } from '../../types/express';
import { response, HttpCodes } from '../../core/express';
import { User } from '../../models';
import jwt from 'jsonwebtoken';

export namespace CheckAuth {
    export let isAuth = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.token || req.headers['authorization'] as string;

        if (token) {
            jwt.verify(token, <string>process.env.JWT_SECRET, (e: any, decoded: any) => {
                if (e) return response(res, HttpCodes.Unauthorized, e);
                req.user = decoded;
                return next();
            });
        } else {
            return response(res, HttpCodes.BadRequest, 'No token proviced');
        }
    };

    export let isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        return next();
    };
}