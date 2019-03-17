import Vue from 'vue';
import Vuex from 'vuex';
import { userModule } from './user-state';
import { StateNamespaces } from './namespaces';
import { shoppingCartModule } from './shoppingcart-state/shoppingcart-state';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        [StateNamespaces.USER_STATE]: userModule,
        [StateNamespaces.SHOPPING_CART_STATE]: shoppingCartModule
    },
});