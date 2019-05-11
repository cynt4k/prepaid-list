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
export type ResetUserAction = (payload: User | undefined) => void;

export enum UserActionTypes {
    CHANGE_USER = 'changeUserAction',
    RESET_STATE = 'resetStateAction',
}

const shoppingCartModule = StateNamespaces.SHOPPING_CART_STATE;

export const userActions: ActionTree<UserState, any> = {
    [UserActionTypes.CHANGE_USER](context, payload: User | undefined) {
        context.commit(UserMutationTypes.CHANGE_USER, payload);
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
