import { Product } from '@/interfaces/Product';
import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';

///////////////////////////////////////
// State
///////////////////////////////////////

export interface ShoppingCartState {
    shoppingCart: ShoppingCartItem[];
}

///////////////////////////////////////
// Mutation
///////////////////////////////////////
export enum ShoppingCartMutationTypes {
    ADD_PRODUCT = 'addProductMutation',
}

export const mutations: MutationTree<ShoppingCartState> = {
    [ShoppingCartMutationTypes.ADD_PRODUCT]: (
        state,
        payload: ShoppingCartItem
    ) => {
        state.shoppingCart.push(payload);
    },
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
export type AddProductAction = (payload: ShoppingCartItem) => void;

export enum ShoppingCartActionTypes {
    ADD_PRODUCT = 'addProductAction',
}

///////////////////////////////////////
// Getters
///////////////////////////////////////
export const actions: ActionTree<ShoppingCartState, any> = {
    [ShoppingCartActionTypes.ADD_PRODUCT](context, payload: ShoppingCartItem) {
        context.commit(ShoppingCartMutationTypes.ADD_PRODUCT, payload);
    },
};

export const getters: GetterTree<ShoppingCartState, any> = {
    items: (state): ShoppingCartItem[] =>
        state.shoppingCart ? state.shoppingCart : [],
    sum: (state): number => {
        let sum: number = 0;
        state.shoppingCart.forEach((item: ShoppingCartItem) => {
            sum += item.product.price * item.amount;
        });
        return sum;
    },
};

///////////////////////////////////////
// Module
///////////////////////////////////////
const initialState: ShoppingCartState = {
    shoppingCart: [],
};

export const shoppingCartModule: Module<ShoppingCartState, any> = {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
