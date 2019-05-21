import { ActionTree } from 'vuex';
import { UserState } from './user-state-types';
import { User } from '@/interfaces/User';
import { UserMutationTypes } from './user-mutations';
import {
    ShoppingCartMutationTypes,
    ShoppingCartActionTypes,
} from '../shoppingcart-state/shoppingcart-state';
import { StateNamespaces } from '../namespaces';
import { namespace } from 'vuex-class';
import { IJwtService } from '@/types';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { container } from '@/inversify.config';

export type ChangeUserAction = (payload: User | undefined) => void;
export type ResetUserAction = () => void;
export type UpdateBalanceAction = (payload: number) => void;

export enum UserActionTypes {
    CHANGE_USER = 'changeUserAction',
    RESET_STATE = 'resetStateAction',
    UPDATE_BALANCE = 'updateBalanceAction'
}

const shoppingCartModule = StateNamespaces.SHOPPING_CART_STATE;

export const userActions: ActionTree<UserState, any> = {
    [UserActionTypes.CHANGE_USER](context, payload: User | undefined) {
        context.commit(UserMutationTypes.CHANGE_USER, payload);
    },
    [UserActionTypes.UPDATE_BALANCE](context, payload: number) {
        context.commit(UserMutationTypes.UPDATE_BALANCE, payload);
    },
    [UserActionTypes.RESET_STATE](context) {
        const jwtService = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);

        jwtService.destoryToken();
        jwtService.destoryRefreshToken();

        context.commit(UserMutationTypes.RESET_STATE);
        context.dispatch(
            shoppingCartModule + '/' + ShoppingCartActionTypes.RESET_STATE,
            {},
            { root: true }
        );
    },
};
