import { GetterTree } from 'vuex';
import { UserState } from './user-state-types';

export const userGetters: GetterTree<UserState, any> = {
    userName: (state) => state.user.name,
    userNick: (state) => state.user.nick,
    user: (state) => state.user,
};
