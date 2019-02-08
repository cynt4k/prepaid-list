import { MutationTree } from 'vuex';

import { UserState } from './user-state-types';

export enum UserMutationTypes {
    CHANGE_USER_NAME = 'changeUserName',
    CHANGE_USER_NICK = 'changeUserNick',
}

export const userMutations: MutationTree<UserState> = {
    [UserMutationTypes.CHANGE_USER_NAME]: (state, payload: string) => {
        state.user.name = payload;
    },
    [UserMutationTypes.CHANGE_USER_NICK]: (state, payload: string) => {
        state.user.nick = payload;
    }
};
