import express, { Request, Response, NextFunction } from 'express';
import { response, HttpCodes } from '../../core/express';
import passport from 'passport';
import { Passport } from '../../core';
import { IUserModel } from '../../types/models';
import { Template } from '../../misc';
import { IVerifyOptions } from 'passport-local';

export namespace AuthController {
    export let postLoginUsername = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('login-username', { session: true }, (e: Error, user: IUserModel, info: IVerifyOptions) => {
            if (e) return next(e);
            if (!user) return response(res, HttpCodes.NotFound, info.message);
            req.login(user, (eLogin) => {
                if (eLogin) return next(eLogin);
                Passport.generateToken(req);
                return response(res, HttpCodes.OK, res.__(Template.I18N_INFO_SUCCESS), Passport.respondToken(req));
            });
        })(req, res, next);
    };

    export let postLoginToken = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('login-token', (e: Error, user: IUserModel, info: IVerifyOptions) => {
            if (e) return next(e);
            if (!user) return response(res, HttpCodes.NotFound, info.message);
            req.login(user, (eLogin) => {
                if (eLogin) return next(eLogin);
                Passport.generateToken(req);
                return response(res, HttpCodes.OK, res.__(Template.I18N_INFO_SUCCESS), Passport.respondToken(req));
            });
        })(req, res, next);
    };

    export let postRegister = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('signup-user', (e: Error, user: IUserModel, info: IVerifyOptions) => {
            if (e) return next(e);
            if (!user) return response(res, HttpCodes.BadRequest, info.message);
            req.login(user, (eLogin) => {
                if (eLogin) return next(eLogin);
                Passport.generateToken(req);
                return response(res, HttpCodes.OK , res.__(Template.I18N_INFO_SUCCESS), Passport.respondToken(req));
            });
        })(req, res, next);
    };

    export const renewToken = (req: Request, res: Response, next: NextFunction) => {
        if (req.body.refreshToken) {
            Passport.verifyRefreshToken(req.body.refreshToken, (e) => {
                if (e) return response(res, HttpCodes.BadRequest, res.__(e.message));
                Passport.generateToken(req);
                return response(res, HttpCodes.OK, res.__(Template.I18N_INFO_SUCCESS), Passport.respondToken(req));
            });
        } else {
            return response(res, HttpCodes.BadRequest, res.__(Template.I18N_WARN_NO_REFRESH_TOKEN));
        }
    };
}
