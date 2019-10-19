import Vue from 'vue';
import Vuex from 'vuex';
import { UserModule } from './modules/user';
import { IUserState } from './modules/user/user.state';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
}

export default new Vuex.Store<IRootState>({});

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     user: UserModule
//   },
// });
