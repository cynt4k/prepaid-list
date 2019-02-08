import { ActionTree } from 'vuex';
import { UserState, ChangeUserAction } from './user-state-types';

export type ChangeUserNameAction = (payload: ChangeUserAction) => {};

export type ChangeUserNickAction = (payload: ChangeUserAction) => {};

export const userActions: ActionTree<UserState, any> = {
    changeUserNameAction(context, payload: ChangeUserAction) {
        context.commit('changeUserName', payload.user.name);
    },
    changeUserNickAction(context, payload: ChangeUserAction) {
        context.commit('changeUserNick', payload.user.nick);
    }
};
