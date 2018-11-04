import { User } from '../../models';
import { Types } from 'mongoose';

export namespace UserValidator {
    export let userIdExist = async (value: Types.ObjectId) => {
        try {
            const user = await User.findById(value);
            if (user) return Promise.reject('User already exsit');
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    export let userIdNotExist = async (value: Types.ObjectId) => {
        try {
            const user = await User.findById(value);
            if (!user) return Promise.reject('User does not exist');
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    export let usernameNotExist = async (value: string) => {
        try {
            const user = await User.findOne({ username: value });
            if (!user) return Promise.reject('User does not exist');
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}