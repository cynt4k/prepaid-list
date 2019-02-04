import { Types } from 'mongoose';
import { IAclModel, IUserModel, AclRight } from '../../types/models';
import { Acl, User } from '../../models';

export namespace AclCheck {

    export const init = (): void => {

    };

    export const isAllowed = async (userId: Types.ObjectId, right: AclRight): Promise<boolean> => {
        try {
            const user = await getFullUser(userId);
            // const acl = await Acl.find({rights: { $elemMatch: { right }}});
            user.role.acls.forEach((acl: IAclModel) => {
                const result = acl.rights.find((searchAcl: AclRight) => searchAcl === right);
                if (result) {
                    return Promise.resolve(true);
                }
            });
        } catch (e) {
            throw e;
        }
        return Promise.resolve(false);
    };

    const getFullUser = async (userId: Types.ObjectId): Promise<IUserModel> => {
        let result = await User.findById(userId).populate('acl-group').exec();
        if (!result) {
            throw new Error('User not found');
        }
        result = await result.populate('childs').populate('acls').execPopulate();
        return result;
    };
}
