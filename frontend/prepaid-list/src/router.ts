import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from '@/views/Register.vue';
import UserSelect from '@/views/UserSelect.vue';
import Dashboard from '@/views/Dashboard.vue';
import BuyProduct from '@/views/buy-product/BuyProduct.vue';
import SingleProducts from '@/views/buy-product/SingleProducts.vue';
import Confirmation from '@/views/buy-product/Confirmation.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
        },
        {
            path: '/userSelect',
            name: 'UserSelect',
            component: UserSelect,
        },
        {
            path: '/user/dashboard',
            name: 'Dashboard',
            component: Dashboard,
        },
        // {
        //     path: '',
        //     component: NavigationToolbarLayout,
        //     children: [
        {
            path: '/user/buyProducts',
            name: 'BuyProduct',
            component: BuyProduct,
        },
        {
            path: '/user/buyProducts/products/:category',
            name: 'SingleProducts',
            component: SingleProducts,
        },
        {
            path: '/user/buyProducts/confirmation',
            name: 'Confirmation',
            component: Confirmation,
        },
        //     ],
        // },
    ],
});
