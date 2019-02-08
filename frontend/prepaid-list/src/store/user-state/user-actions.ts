import { ActionTree } from 'vuex';
import { UserState } from './user-state-types';
import { User } from '@/interfaces/User';
import { UserMutationTypes } from './user-mutations';
export type ChangeUserNameAction = (payload: string) => {};

export type ChangeUserNickAction = (payload: string) => {};

export type ChangeUserAction = (payload: User) => {};

export enum UserActionTypes {
    CHANGE_USER_NAME = 'changeUserNameAction',
    CHANGE_USER_NICK = 'changeUserNickAction',
    CHANGE_USER = 'changeUserAction',
}

export const userActions: ActionTree<UserState, any> = {
    [UserActionTypes.CHANGE_USER_NAME](context, payload: string) {
        context.commit(UserMutationTypes.CHANGE_USER_NICK, payload);
    },
    [UserActionTypes.CHANGE_USER_NICK](context, payload: string) {
        context.commit(UserMutationTypes.CHANGE_USER_NICK, payload);
    },
    [UserActionTypes.CHANGE_USER](context, payload: User) {
        context.dispatch(UserActionTypes.CHANGE_USER_NAME, payload.name);
        context.dispatch(UserActionTypes.CHANGE_USER_NICK, payload.nick);
    }
};
