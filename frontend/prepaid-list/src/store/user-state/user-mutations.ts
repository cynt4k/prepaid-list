import { MutationTree } from 'vuex';
import { User } from '@/interfaces/User';
import { UserState } from './user-state-types';

export enum UserMutationTypes {
    CHANGE_USER = 'changeUserMutation'
}

export const userMutations: MutationTree<UserState> = {
    [UserMutationTypes.CHANGE_USER]: (state, payload: User) => {
        state.user = payload;
    }
};
