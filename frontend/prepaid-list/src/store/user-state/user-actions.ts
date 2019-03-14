import { ActionTree } from 'vuex';
import { UserState } from './user-state-types';
import { User } from '@/interfaces/User';
import { UserMutationTypes } from './user-mutations';

export type ChangeUserAction = (payload: User | undefined) => void;

export enum UserActionTypes {
    CHANGE_USER = 'changeUserAction'
}

export const userActions: ActionTree<UserState, any> = {
    [UserActionTypes.CHANGE_USER](context, payload: User | undefined) {
        context.commit(UserMutationTypes.CHANGE_USER, payload);
    }
};
