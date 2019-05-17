import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Home from './views/Home.vue';
import Register from '@/views/Register.vue';
import UserSelect from '@/views/UserSelect.vue';
import Dashboard from '@/views/Dashboard.vue';
import BuyProduct from '@/views/buy-product/BuyProduct.vue';
import Recharge from '@/views/Recharge.vue';
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
    } else if (
        route.name === 'UserSingleProductInfos' ||
        route.name === 'SingleProductInfos' ||
        route.name === 'ProductInfos' ||
        route.name === 'UserProductInfos'
    ) {
        return { firstPart: 'Produkt', secondPart: 'Infos' };
    } else if (route.name === 'Recharge') {
        return { firstPart: 'Guthaben', secondPart: 'einzahlen' };
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
                showBackBtn: route.name !== 'Home' && route.name !== 'Dashboard',
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
                    name: 'ProductInfos',
                    path: '/productInfos',
                    component: BuyProduct,
                    props: { showFooter: false },
                },
                {
                    path: 'productInfos/singleProducts/:category',
                    name: 'SingleProductInfos',
                    component: SingleProducts,
                    props: (route: Route) => ({
                        category: route.params.category,
                        showFooter: false,
                    }),
                },
                {
                    path: '/user/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                {
                    path: '/user/nav',
                    component: NavigationToolbarLayout,
                    children: [
                        {
                            path: 'recharge',
                            name: 'Recharge',
                            component: Recharge,
                        },
                        {
                            path: 'buyProducts',
                            name: 'BuyProduct',
                            component: BuyProduct,
                        },
                        {
                            path: 'buyProducts/singleProducts/:category',
                            name: 'SingleProducts',
                            component: SingleProducts,
                            props: true,
                        },
                        {
                            path: 'confirmation',
                            name: 'Confirmation',
                            component: Confirmation,
                        },
                        {
                            name: 'UserProductInfos',
                            path: 'productInfos',
                            component: BuyProduct,
                            props: { showFooter: false },
                        },
                        {
                            path: 'productInfos/singleProducts/:category',
                            name: 'UserSingleProductInfos',
                            component: SingleProducts,
                            props: (route: Route) => ({
                                category: route.params.category,
                                showFooter: false,
                            }),
                        },
                    ],
                },
            ],
        },
    ],
});
