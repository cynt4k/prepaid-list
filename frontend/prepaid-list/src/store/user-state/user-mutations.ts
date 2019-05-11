import { MutationTree } from 'vuex';
import { User } from '@/interfaces/User';
import { UserState } from './user-state-types';

export enum UserMutationTypes {
    CHANGE_USER = 'changeUserMutation',
    RESET_STATE = 'resetStateMutation',
    UPDATE_BALANCE = 'updateBalanceMutation',
}

export const userMutations: MutationTree<UserState> = {
    [UserMutationTypes.CHANGE_USER]: (state: UserState, payload: User) => {
        state.user = payload;
    },
    [UserMutationTypes.RESET_STATE]: (state: UserState) => {
        state.user = undefined;
    },
    [UserMutationTypes.UPDATE_BALANCE]: (state: UserState, payload: number) => {
        if (state.user) {
            state.user.credit = payload;
        }
    },
};
