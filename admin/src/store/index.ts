import Vue from 'vue';
import Vuex from 'vuex';
import { UserModule } from './modules/user';
import { IUserState } from './modules/user/user.state';
import { IMessageState } from './modules/message/message.state';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  message: IMessageState;
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
