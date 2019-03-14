import { GetterTree } from 'vuex';
import { UserState } from './user-state-types';
import { User } from '@/interfaces/User';

export const userGetters: GetterTree<UserState, any> = {
    userName: (state): string => (state.user ? state.user.name : ''),
    userNick: (state): string => (state.user ? state.user.nick : ''),
    user: (state): User | undefined => state.user,
};
