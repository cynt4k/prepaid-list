import { Request, Response, NextFunction } from 'express';
import { response, HttpCodes } from '../../core/express';
import { User } from '../../models';
import jwt from 'jsonwebtoken';
import { PrepaidListError } from '../../errors';
import { I18n } from '../../misc';
import { ErrorCode } from '../../types/error';

export namespace CheckAuth {
    export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.token || req.headers['authorization'] as string;

        if (token) {
            jwt.verify(token, <string>process.env.JWT_SECRET, async (e: any, decoded: any) => {
                if (e) return response(res, HttpCodes.Unauthorized, e);
                req.user = decoded;
                const user = await User.findById(req.user.id);
                if (!user) return next(new PrepaidListError(I18n.WARN_USERS_NOT_FOUND, ErrorCode.USER_NOT_FOUND));
                return next();
            });
        } else {
            return response(res, HttpCodes.BadRequest, 'No token proviced');
        }
    };

    export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        return next();
    };
}
