import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import Register from '@/views/Register.vue';
import UserSelect from '@/views/UserSelect.vue';
import Dashboard from '@/views/Dashboard.vue';
import BuyProduct from '@/views/buy-product/BuyProduct.vue';
import SingleProducts from '@/views/buy-product/SingleProducts.vue';
import Confirmation from '@/views/buy-product/Confirmation.vue';

import ToolbarLayout from '@/layout/ToolbarLayout.vue';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';

Vue.use(Router);

export interface Title {
    firstPart: string;
    secondPart: string;
}

function titleFct(route: Route): Title {
    if (route.name === 'UserSelect') {
        return { firstPart: 'Benutzer', secondPart: 'Auswahl' };
    } else if (route.name === 'Register') {
        return { firstPart: 'Benutzer', secondPart: 'registrieren' };
    } else if (route.name === 'Dashboard') {
        return { firstPart: 'Dash', secondPart: 'Board' };
    } else if (route.name === 'BuyProduct') {
        return { firstPart: 'Produkt', secondPart: 'kaufen' };
    } else if (route.name === 'SingleProducts') {
        return { firstPart: 'Produkt', secondPart: 'kaufen' };
    } else if (route.name === 'Confirmation') {
        return { firstPart: 'Einkauf', secondPart: 'bestätigen' };
    } else {
        return { firstPart: 'Digitale', secondPart: 'Prepaid Liste' };
    }
}

export default new Router({
    routes: [
        {
            path: '/',
            component: ToolbarLayout,
            props: (route: Route) => ({
                title: titleFct(route),
                titleFirst: 'Digitale',
                titleSecond: 'Prepaidliste',
                showBackBtn: route.name !== 'Home',
            }),
            children: [
                { name: 'Home', component: Home, path: '/' },
                { path: '/register', name: 'Register', component: Register },
                {
                    name: 'UserSelect',
                    path: '/userSelect',
                    component: UserSelect,
                },
                {
                    path: '/user/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                {
                    path: '/user/buyProducts',
                    component: NavigationToolbarLayout,
                    children: [
                        {
                            path: '/',
                            name: 'BuyProduct',
                            component: BuyProduct,
                        },
                        {
                            path: 'products/:category',
                            name: 'SingleProducts',
                            component: SingleProducts,
                            props: true,
                        },
                        {
                            path: 'confirmation',
                            name: 'Confirmation',
                            component: Confirmation,
                        },
                    ],
                },
            ],
        },
    ],
});
