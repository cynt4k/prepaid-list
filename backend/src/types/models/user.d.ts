import { Document } from 'mongoose';

export interface IUserModel extends Document {
    username: string,
    token: number,
    email: string,
    name: {
        firstname: string,
        lastname: string
    },
    admin: boolean,
    balance: number
}
