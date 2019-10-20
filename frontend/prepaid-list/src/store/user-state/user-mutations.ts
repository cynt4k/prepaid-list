import { MutationTree } from 'vuex';
import { User } from '@/interfaces/User';
import { UserState } from './user-state-types';
import { State } from 'vuex-class';

export enum UserMutationTypes {
    LOGIN_USER = 'loginUserMutation',
    RESET_STATE = 'resetStateMutation',
	UPDATE_BALANCE = 'updateBalanceMutation',
	REFRESH_TOKEN = 'refreshTokenMutation',
	INVALIDATE_TOKEN = 'invalidateTokenMutation'
}

export const userMutations: MutationTree<UserState> = {
    [UserMutationTypes.LOGIN_USER]: (state: UserState, payload: User) => {
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
	[UserMutationTypes.REFRESH_TOKEN]: (state: UserState, payload: string) => {
		state.token = payload;
	},
	[UserMutationTypes.INVALIDATE_TOKEN]: (state: UserState) => {
        state.token = undefined;
    },
};
