import { Types } from 'mongoose';
import { IUserModel } from '../models';

export interface IUser {
    username: string;
    id: Types.ObjectId;
}
