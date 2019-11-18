import { Document } from 'mongoose';
import { ITimestamp } from './timestamp';
import { IAclGroupModel } from './acl-group';

export interface IUserModel extends Document, ITimestamp {
    username: string;
    tokenUid: string;
    password?: string;
    email: string;
    name: {
        firstname: string,
        lastname: string
    };
    balance: number;
    role: IAclGroupModel;
    active: boolean;
    compareToken: (checkToken: string, cb: (e: any, isMatch: any) => {}) => void;
    updateToken: (newToken: string) => void;
    comparePassword: (checkingPassword: string, cb: (e: any, isMatch: any) => void) => void;
    updatePassword: (newPassword: string) => void;
    updateBalance: (amount: number, cb: (e: any) => void) => void;
}
