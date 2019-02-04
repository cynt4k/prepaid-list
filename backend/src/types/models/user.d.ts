import { Document } from 'mongoose';
import { ITimestamp } from './timestamp';
import { IAclGroupModel } from './acl-group';

export interface IUserModel extends Document, ITimestamp {
    username: string;
    tokenUid: string;
    email: string;
    name: {
        firstname: string,
        lastname: string
    };
    balance: number;
    role: IAclGroupModel;
    compareToken: (checkToken: string, cb: (e: any, isMatch: any) => {}) => void;
    updateToken: (newToken: string) => void;
}
