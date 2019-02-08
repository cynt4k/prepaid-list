import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import UserSelect from '@/views/UserSelect.vue';
import Dashboard from '@/views/Dashboard.vue';
import BuyProduct from '@/views/BuyProduct.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/userSelect',
      name: 'UserSelect',
      component: UserSelect
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard/buyProduct',
      name: 'BuyProduct',
      component: BuyProduct
    }
  ],
});
