import Vue from 'vue';
import Vuex from 'vuex';
import {userModule } from './user-state';
import { StateNamespaces } from './namespaces';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        [StateNamespaces.USER_STATE]: userModule
    },
});
