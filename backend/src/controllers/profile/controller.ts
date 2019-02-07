import { response, HttpCodes } from '../../core/express';
import express from 'express';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { IUserModel } from '../../types/models/user';
import { Template, I18n } from '../../misc';

export namespace ProfileController {

    export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.user.id).exec();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, user!.balance);
        } catch (e) {
            return next(e);
        }
    };

    export const putUpdateUser = async (req: Request, res: Response, next: NextFunction) => {
        const updateUser: IUserModel = <IUserModel> req.body;
        try {
            const user = await User.findById(req.user.id).exec();
            if (updateUser.tokenUid) {
                user!.tokenUid = bcrypt.hashSync(updateUser.tokenUid, bcrypt.genSaltSync(10));
            }
            await user!.save();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS);
        } catch (e) {
            return next(e);
        }
    };

    export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.user.id).populate('role').exec();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, user);
        } catch (e) {
            return next(e);
        }
    };

    export const putAddBalance = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await User.findById(req.user.id).exec();
            user!.balance += req.body.balance;
            await user!.save();
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, user);
        } catch (e) {
            return next(e);
        }
    };
}
