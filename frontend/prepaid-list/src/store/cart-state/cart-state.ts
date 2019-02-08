import { CartState } from './cart-state-types';
import { Module } from 'vuex';
import { cartActions } from './cart-actions';
import { cartMutations } from './cart-mutations';
import { cartGetters } from './cart-getters';
import { userMutations } from '../user-state/user-mutations';

const initialCartState: CartState = {
    numArticles: 0,
};

export const cartModule: Module<CartState, any> = {
    namespaced: true,
    state: initialCartState,
    getters: cartGetters,
    mutations: cartMutations,
    actions: cartActions,
};
