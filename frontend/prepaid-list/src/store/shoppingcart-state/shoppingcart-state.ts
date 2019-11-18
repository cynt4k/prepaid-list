import { Product } from '@/interfaces/Product';
import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';

///////////////////////////////////////
// State
///////////////////////////////////////
export interface ShoppingCartState {
    shoppingCart: {
        [key: string]: ShoppingCartItem;
    };
}

///////////////////////////////////////
// Mutation
///////////////////////////////////////
export enum ShoppingCartMutationTypes {
    ADD_PRODUCT = 'addProductMutation',
    REMOVE_PRODUCT = 'removeProductMutation',
    RESET_STATE = 'resetStateMutation',
    DELETE_PRODUCT = 'deleteProductMutation',
}

function keyFct(item: ShoppingCartItem) {
    return (
        item.product.name + (item.productExtra ? item.productExtra!.name : '')
    );
}

export const mutations: MutationTree<ShoppingCartState> = {
    [ShoppingCartMutationTypes.ADD_PRODUCT]: (
        state,
        payload: ShoppingCartItem
    ) => {
        // TODO: Später auf id ändern: payload.product.id
        const key = keyFct(payload);
        if (state.shoppingCart[key]) {
            payload.amount = state.shoppingCart[key].amount + 1;
        }
        state.shoppingCart = { ...state.shoppingCart, [key]: payload };
    },
    [ShoppingCartMutationTypes.REMOVE_PRODUCT]: (
        state,
        payload: ShoppingCartItem
    ) => {
        const key = keyFct(payload);
        if (state.shoppingCart[key]) {
            payload.amount = state.shoppingCart[key].amount - 1;
        }
        payload.amount = payload.amount > 1 ? payload.amount : 1;
        state.shoppingCart = { ...state.shoppingCart, [key]: payload };
    },
    [ShoppingCartMutationTypes.RESET_STATE]: (state: ShoppingCartState) => {
        state.shoppingCart = {};
    },
    [ShoppingCartMutationTypes.DELETE_PRODUCT]: (
        state: ShoppingCartState,
        payload: ShoppingCartItem
    ) => {
        const key = keyFct(payload);
        delete state.shoppingCart[key];
        state.shoppingCart = { ...state.shoppingCart };
    },
};

///////////////////////////////////////
// Actions
///////////////////////////////////////
export type AddProductAction = (payload: ShoppingCartItem) => void;
export type RemoveProductAction = (payload: ShoppingCartItem) => void;
export type DeleteProductAction = (payload: ShoppingCartItem) => void;
export type ResetStateAction = () => void;

export enum ShoppingCartActionTypes {
    ADD_PRODUCT = 'addProductAction',
    REMOVE_PRODUCT = 'removeProductAction',
    RESET_STATE = 'resetStateAction',
    DELETE_PRODUCT = 'deleteProductAction',
}

export const actions: ActionTree<ShoppingCartState, any> = {
    [ShoppingCartActionTypes.ADD_PRODUCT](context, payload: ShoppingCartItem) {
        context.commit(ShoppingCartMutationTypes.ADD_PRODUCT, payload);
    },
    [ShoppingCartActionTypes.REMOVE_PRODUCT](
        context,
        payload: ShoppingCartItem
    ) {
        context.commit(ShoppingCartMutationTypes.REMOVE_PRODUCT, payload);
    },
    [ShoppingCartActionTypes.RESET_STATE](context) {
        context.commit(ShoppingCartMutationTypes.RESET_STATE);
    },
    [ShoppingCartActionTypes.DELETE_PRODUCT](
        context,
        payload: ShoppingCartItem
    ) {
        context.commit(ShoppingCartMutationTypes.DELETE_PRODUCT, payload);
    },
};

///////////////////////////////////////
// Getters
///////////////////////////////////////
export const getters: GetterTree<ShoppingCartState, any> = {
    shoppingCartItems: (state): ShoppingCartItem[] => {
        const result: ShoppingCartItem[] = [];

        for (const key in state.shoppingCart) {
            if (state.shoppingCart.hasOwnProperty(key)) {
                result.push(state.shoppingCart[key]);
            }
        }
        return result;
    },
    shoppingCartSum: (state): number => {
        let sum: number = 0;
        Object.keys(state.shoppingCart).forEach((key: string) => {
            const item: ShoppingCartItem = state.shoppingCart[key];
            const price =
                item.product.price +
                (item.productExtra ? item.productExtra.price : 0);
            sum += price * state.shoppingCart[key].amount;
        });
        return sum;
    },
    shoppingCartIsEmpty: (state, getters1): boolean => {
        return getters1.shoppingCartItems.length === 0;
    },
};

///////////////////////////////////////
// Module
///////////////////////////////////////
const initialState: ShoppingCartState = {
    shoppingCart: {},
};

export const shoppingCartModule: Module<ShoppingCartState, any> = {
    namespaced: true,
    state: initialState,
    getters,
    mutations,
    actions,
};
