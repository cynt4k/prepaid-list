import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserSelect from '@/views/UserSelect.vue';
import Sandbox from './views/Sandbox.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/userSelect',
      name: 'UserSelect',
      component: UserSelect
    },
    {
      path: '/test',
      name: 'Sandbox',
      component: Sandbox
    },
  ],
});
