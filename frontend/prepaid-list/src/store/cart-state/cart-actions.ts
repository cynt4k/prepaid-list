import { ActionTree } from 'vuex';
import { CartState } from './cart-state-types';
import { CartMutationTypes } from './cart-mutations';

export type AddArticleAction = (article: any) => {};

export enum CartActionTypes {
    ADD_ARTICLE = 'addArticle',
}

export const cartActions: ActionTree<CartState, any> = {
    [CartActionTypes.ADD_ARTICLE](context, payload) {
        context.commit(CartMutationTypes.ADD_ARTICLE, payload);
    }
};
