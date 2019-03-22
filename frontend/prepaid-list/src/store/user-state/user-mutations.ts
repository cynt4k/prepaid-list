import { MutationTree } from 'vuex';
import { User } from '@/interfaces/User';
import { UserState } from './user-state-types';

export enum UserMutationTypes {
    CHANGE_USER = 'changeUserMutation',
    RESET_STATE = 'resetStateMutation'
}

export const userMutations: MutationTree<UserState> = {
    [UserMutationTypes.CHANGE_USER]: (state, payload: User) => {
        state.user = payload;
    },
    [UserMutationTypes.RESET_STATE]: (state) => {
        state.user = undefined;
    }
};
