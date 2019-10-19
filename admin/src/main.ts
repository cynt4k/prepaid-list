import Vue, { VNode, CreateElement } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import { Component } from 'vue-property-decorator';

Component.registerHooks(['validations']);

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: (h: CreateElement): VNode => h(App),
}).$mount('#app');
