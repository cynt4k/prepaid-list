<template>
  <v-container fluid fill-height>
    <v-card v-if="!show" class="shoppingCart">
      <v-card-title>
        <v-icon style="font-size: 21px; margin-right: 10px">mdi-cart</v-icon>
        <h2>Warenkorb</h2>
      </v-card-title>
      <v-divider></v-divider>
      <div>
        <shopping-cart/>
      </div>
    </v-card>

    <confirmation-navigation-footer/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import ConfirmationNavigationFooter from '@/components/ConfirmationNavigationFooter.vue';

import { User } from '@/interfaces/User';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';

import ShoppingCart from '@/components/ShoppingCart.vue';

const userModule = namespace(StateNamespaces.USER_STATE);
const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    components: {
        NavigationToolbarLayout,
        ConfirmationNavigationFooter,
        ShoppingCart,
    },
    filters: {
        currency(s: number) {
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return formatter.format(s);
        },
    },
})
export default class Confirmation extends Vue {
    private show: boolean = false;

    @userModule.Getter
    private user!: User;

    @shoppingCartModule.Getter
    private shoppingCartSum!: number;

    public switchContent() {
        this.show = !this.show;
    }
}
</script>

<style lang="scss">
.shoppingCart {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: initial !important;
}
</style>
 