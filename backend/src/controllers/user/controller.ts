import { response, HttpCodes } from '../../core/express';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { IUserModel } from '../../types/models/user';
import { Template, I18n } from '../../misc';
export namespace UserController {

    export const registerUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser: IUserModel = <IUserModel> req.body;
            const result = await User.create(newUser);
            if (result) {
                return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, result);
            }
            return response(res, HttpCodes.InternalServerError, I18n.ERR_INTERNAL_SERVER);
        } catch (e) {
            return next(e);
        }
    };
}
