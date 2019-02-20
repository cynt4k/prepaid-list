import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from '@/views/Register.vue';
import UserSelect from '@/views/UserSelect.vue';
import Dashboard from '@/views/Dashboard.vue';
import BuyProduct from '@/views/BuyProduct.vue';
import SingleProducts from '@/views/SingleProducts.vue';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';

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
        //     ],
        // },
    ],
});
