import { GetterTree } from 'vuex';
import { CartState } from './cart-state-types';

export const cartGetters: GetterTree<CartState, any> = {
    articleCount: (state) => state.numArticles,
};
