import { Document } from 'mongoose';

export interface IUserModel extends Document {
    username: string;
    tokenUid: string;
    email: string;
    name: {
        firstname: string,
        lastname: string
    };
    balance: number;
    compareToken: (string, cb: (e: any, isMatch: any) => {}) => void;
    updateToken: (string) => void;
}
