import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import { any } from 'bluebird';
import { Request, NextFunction } from 'express';
import { IUserModel } from '../../types/models';
import { IUser } from '../../types/express';
import { Template } from '../../misc';

const LocalStrategy = passportLocal.Strategy;

const secret: string = process.env.JWT_SECRET || '';

passport.serializeUser<any, any>((user, done) => {
    return done(undefined, user.id);
});

passport.deserializeUser(async(id, done) => {
    User.findById(id, (e: any, user: any) => {
        done(e, user);
    });
});

declare global {
    namespace Express {
        interface Request {
            token?: string;
            user?: IUser | any;
        }
    }
}

passport.use('login-token', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'token',
    passwordField: 'token'
}, async (req: Request, token: string, password: string, done: any) => {
    try {
        const users = await User.find({ token: { $exists: true }}, '+token');
        const res = users.find((user: IUserModel) => {
            if (bcrypt.compareSync(token, user.tokenUid)) {
                return true;
            } else {
                return false;
            }
        });
        if (!res) {
            return done(undefined, false, { message: req.__(Template.I18N_WARN_UID_TOKEN_NOT_FOUND, token) });
        }
        return done(undefined, res);
    } catch (e) {
        return done(e);
    }
}));

passport.use('login-username', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'username'
}, async (req: Request, username: string, password: string, done) => {
    try {
        const user = await User.findOne({ username: username.toLowerCase() });
        if (!user) {
            return done(undefined, false, { message: req.__(Template.I18N_WARN_USER_NOT_FOUND, username) });
        }
        return done(undefined, user);
    } catch (e) {
        return done(e);
    }
}));

passport.use('signup-user', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'token'
}, async (req: Request, username: string, token: string , done) => {
    const hashedToken: string | undefined = (username === token) ? undefined : bcrypt.hashSync(token, bcrypt.genSaltSync(10));
    try {
        const userResult = await User.findOne({ username: username.toLowerCase() });
        const userToken = await User.findOne({ token: hashedToken });
        if (userResult) {
            return done(undefined, false, { message: req.__(Template.I18N_WARN_USER_EXIST, username) });
        }
        if (userToken) {
            return done(undefined, false, { message: req.__(Template.I18N_WARN_UID_TOKEN_EXIST, token) });
        }
    } catch (e) {
        return done(e);
    }

    const user: IUserModel = new User(<IUserModel>{
        username: username.toLowerCase(),
        tokenUid: hashedToken,
        name: {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    });

    try {
        const res: IUserModel = await user.save();
        return done(undefined, res);
    } catch (e) {
        return done(e);
    }
}));

export namespace Passport {
    export let generateToken = (req: Request) => {
        req.token = jwt.sign({
            username: (req.user || { username: undefined}).username,
            id: (req.user || {id: undefined}).id
        }, process.env.JWT_SECRET || '', {
            expiresIn: '1h'
        });
    };

    export let respondToken = (req: Request) => {
        return {
            user: (req.user || {username: undefined}).username,
            token: req.token
        };
    };
}
