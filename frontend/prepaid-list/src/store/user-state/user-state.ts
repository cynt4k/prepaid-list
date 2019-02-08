import { UserState } from './user-state-types';
import { Module } from 'vuex';
import { userActions } from './user-actions';
import { userMutations } from './user-mutations';
import { userGetters } from './user-getters';

const initialUserState: UserState = {
    user: {
        name: 'Sergej',
        nick: 'Fährlich',
    }
};


export const userModule: Module<UserState, any> = {
    namespaced: true,
    state: initialUserState,
    getters: userGetters,
    mutations: userMutations,
    actions: userActions,
};
