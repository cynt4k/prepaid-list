import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { I18n, Template } from '../../misc';
import { IAclModel, IUserModel, AclRight } from '../../types/models';
import { Acl, User } from '../../models';
import  { PrepaidListError } from '../../errors';
import { ErrorCode } from '../../types/error';

export namespace CheckAcl {

    export const init = (): void => {

    };

    export const middlewareIsAllowed = (right: AclRight): RequestHandler => {
        const middleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
            try {
                const result = await isAllowed(req.user.id, right);
                if (result) {
                    return next();
                } else {
                    return next(new PrepaidListError(I18n.WARN_USER_NOT_ALLOWED, ErrorCode.USER_NOT_ALLOWED));
                }
            } catch (e) {
                return next(e);
            }
        };

        middleware.bind(right);

        return middleware;
    };

    export const isAllowed = async (userId: Types.ObjectId, right: AclRight): Promise<boolean> => {
        try {
            const user = await getFullUser(userId);
            // const acl = await Acl.find({rights: { $elemMatch: { right }}});
            let success = false;
            user.role.acls.forEach((acl: IAclModel) => {
                const result = acl.rights.find((searchAcl: AclRight) => searchAcl === right);
                if (result) {
                    success = true;
                    return;
                }
            });
            if (success) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const getFullUser = async (userId: Types.ObjectId): Promise<IUserModel> => {
        let result = await User.findById(userId).populate('role').exec();
        if (!result) {
            throw new PrepaidListError(I18n.WARN_USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND);
        }
        result = await result.populate('childs').populate('acls').execPopulate();
        return result;
    };
}
