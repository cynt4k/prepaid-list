<template>
  <v-footer>
    <v-dialog v-model="menu" origin="left" transition="slide-y-reverse-transition">
      <v-chip
        slot="activator"
        color="orange"
        text-color="white"
        class="cart-chip"
        :class="{'scaleInAndOut animated': animate}"
        @animationend="animate = false"
      >
        <v-avatar class="orange darken-4">
          <v-icon style="font-size: 21px">mdi-cart</v-icon>
        </v-avatar>
        {{sum | currency}}
      </v-chip>
      <v-card>
        <v-card-title>
          <v-icon style="font-size: 21px; margin-right: 10px">mdi-cart</v-icon>

          <h2>Warenkorb</h2>
          <v-btn icon flat style="margin-left: auto" @click="menu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <div>
          <v-data-table :hide-actions="true" :headers="headers" :items="items" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.product.name }} {{ props.item.productExtra ? `(${props.item.productExtra.name})` : ''}}</td>
              <td>
                <v-btn icon flat>
                  <v-icon>mdi-minus-circle</v-icon>
                </v-btn>
                {{ props.item.amount }}
                <v-btn icon flat>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </td>
              <td>{{ props.item.product.price | currency}}</td>
              <td>{{ (props.item.amount * props.item.product.price) | currency }}</td>
              <td class="text-xs-right">
                <v-btn icon color="error" flat @click="removeItem(props.item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="footer">
              <td :colspan="3" class="text-xs-right">
                <strong>Summe:</strong>
              </td>
              <td :colspan="2">
                <strong>{{sum | currency}}</strong>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-card>
    </v-dialog>

    <v-btn color="success" class="next-btn">Bestätigen
      <v-icon right>mdi-chevron-right-circle</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Product } from '@/interfaces/Product';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';

import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';

import {
    ShoppingCartActionTypes,
    RemoveProductAction,
} from '@/store/shoppingcart-state/shoppingcart-state';

const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
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
export default class ComponentName extends Vue {
    private menu: boolean = false;
    // private cart: ShoppingCartItem[] = [];
    @shoppingCartModule.Getter
    private items!: ShoppingCartItem[];
    @shoppingCartModule.Getter
    private sum!: number;

    private animate: boolean = false;

    @shoppingCartModule.Action(ShoppingCartActionTypes.REMOVE_PRODUCT)
    private removeProductAction!: RemoveProductAction;

    constructor() {
        super();
    }

    public update() {
        this.animate = true;
    }

    private removeItem(item: ShoppingCartItem) {
        this.removeProductAction(item);
    }

    private get headers() {
        return [
            { text: 'Name', sortable: false },
            { text: 'Anzahl', sortable: false },
            { text: 'Einzelpreis', sortable: false },
            { text: 'Gesamtpreis', sortable: false },
            { text: 'Entfernen', sortable: false, align: 'right' },
        ];
    }
}
</script>

<style lang="scss">
.next-btn {
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
}
footer {
    width: 100%;
    height: 50px !important;
}
.cart-chip > span {
    cursor: pointer !important;
}

.scaleInAndOut {
    animation-name: scaleInAndOut;
    z-index: 8;
}
@keyframes scaleInAndOut {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
.animated {
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-direction: alternate;
}
</style>
