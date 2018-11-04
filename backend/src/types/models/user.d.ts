import { Document } from 'mongoose';

export interface IUserModel extends Document {
    username: string,
    token: string,
    email: string,
    name: {
        firstname: string,
        lastname: string
    },
    admin: boolean,
    balance: number,
    compareToken: (string, cb: (e: any, isMatch: any) => {}) => void,
    updateToken: (string) => void
}
