<template>
  <navigation-toolbar-layout titleFirst="Einkauf" titleSecond="bestätigen">
    <v-container>
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

      <v-card v-if="show" class="shoppingCart">
        <div>
          <img :src="require(`@/assets/img/confirmation.gif`)">
        </div>
        <div>
          <h2>Kauf abgeschlossen!</h2>
        </div>
      </v-card>
    </v-container>
    <!-- <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">Benutzer</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="primary">
            <v-card-text class="px-0">{{user ? user.nickname : ''}}</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">Guthaben</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="green">
            <v-card-text class="px-0">{{user ? user.credit : 0 | currency}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">Abzug</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="red">
            <v-card-text class="px-0">{{sum | currency}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card>
            <v-card-text class="px-0">Restguthaben</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-card color="orange">
            <v-card-text class="px-0">{{(user ? user.credit : 0) - sum | currency}}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->
    <confirmation-navigation-footer/>
  </navigation-toolbar-layout>
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
}
</style>
 