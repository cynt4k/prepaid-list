import { Response, NextFunction } from "express";
import { Request } from '../../types/express';
import { HttpCodes, response } from '../../core/express';
import { validationResult } from 'express-validator/check';
import { User } from '../../models';
import { IUserModel } from "../../types/models";

export namespace UserController {
    export let getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.user!.id);
            if (!user) return response(res, HttpCodes.NotFound, 'User not found');
            return response(res, HttpCodes.OK, 'OK', user);
        } catch (e) {
            return next(e);
        }
    };

    export let putUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
        const updatedUser: IUserModel = req.body;
        try {
            const user = await User.findByIdAndUpdate(req.user!.id, updatedUser);
            if (!user) return response(res, HttpCodes.NotFound, 'User not found');
            return response(res, HttpCodes.OK, 'OK');
        } catch (e) {
            return next(e);
        }
    };

    export let putUpdateToken = async (req: Request, res: Response, next: NextFunction) => {
        const newToken = req.body.token;
        try {
            const user = await User.findById(req.user!.id);
            if (!user) return response(res, HttpCodes.NotFound, 'User not found');
            user.updateToken(newToken);
            await user.save();
            return response(res, HttpCodes.OK, 'OK');
        } catch (e) {
            return next(e);
        }
    };

}