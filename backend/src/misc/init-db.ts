import * as data from '../data/init.json';
import { User, Acl } from '../models';
import { AclGroup } from '../models/acl-group.js';

export namespace InitDb {
    const initUser = async (): Promise<void> => {
        try {
            const result = await User.create(data.user);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const initAcl = async (): Promise<void> => {
        try {
            const result = await Acl.create(data.acl);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const initAclGroup = async (): Promise<void> => {
        try {
            const result = await AclGroup.create(data.acl_group);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };

    export const importData = async (): Promise<void> => {
        try {
            await Promise.all([ initUser(), initAcl(), initAclGroup() ]);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    };
}
