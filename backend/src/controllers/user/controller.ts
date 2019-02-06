import { response, HttpCodes } from '../../core/express';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../models/user';
import { IUserModel } from '../../types/models/user';
import { Template, I18n } from '../../misc';
export namespace UserController {

    export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await User.find().exec();
            if (!users) return response(res, HttpCodes.NotFound, I18n.INFO_SUCCESS, []);
            const prettyUser = users.map((user) => {
                if (user.name.firstname && user.name.lastname) {
                    const name = `${user.name.firstname} ${user.name.lastname}`;
                    return {
                        nickname: user.username,
                        name: name
                    };
                }
                return {
                    nickname: user.username
                };
            }).reduce((acc: any, curr) => {
                acc.push(curr);
                return acc;
            }, []);
            return response(res, HttpCodes.OK, I18n.INFO_SUCCESS, prettyUser);
        } catch (e) {
            throw e;
        }
    };
}
