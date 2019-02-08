import { MutationTree } from 'vuex';

import { UserState } from './user-state-types';

export const userMutations: MutationTree<UserState> = {
    changeUserName: (state, payload: string) => {
        state.user.name = payload;
    },
    changeUserNick: (state, payload: string) => {
        state.user.nick = payload;
    }
};
