import { MutationTree } from 'vuex';

import { CartState } from './cart-state-types';

export enum CartMutationTypes {
    ADD_ARTICLE = 'addArticle',
}

export const cartMutations: MutationTree<CartState> = {
    [CartMutationTypes.ADD_ARTICLE]: (state, payload) => {
        state.numArticles++;
    },
};
