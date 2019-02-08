import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import { store } from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
