<template>
  <v-data-table
    :hide-actions="true"
    :headers="headers"
    :items="shoppingCartItems"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.product.name }} {{ props.item.productExtra ? `(${props.item.productExtra.name})` : ''}}</td>
      <td>
        <v-btn icon flat @click="decreaseProduct(props.item)">
          <v-icon>mdi-minus-circle</v-icon>
        </v-btn>
        {{ props.item.amount }}
        <v-btn icon flat @click="addProduct(props.item)">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </td>
      <td>{{ props.item.product.price + (props.item.productExtra ? props.item.productExtra.price : 0) | currency}}</td>
      <td>{{ (props.item.amount * (props.item.product.price + (props.item.productExtra ? props.item.productExtra.price : 0))) | currency }}</td>
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
        <strong>{{shoppingCartSum | currency}}</strong>
      </td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import NavigationFooter from '@/components/NavigationFooter.vue';

import { Product } from '@/interfaces/Product';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';

import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';

import {
    ShoppingCartActionTypes,
    RemoveProductAction,
    AddProductAction,
    DeleteProductAction,
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
export default class ShoppingCart extends Vue {
    @shoppingCartModule.Getter
    private shoppingCartItems!: ShoppingCartItem[];

    @shoppingCartModule.Getter
    private shoppingCartSum!: number;

    @shoppingCartModule.Action(ShoppingCartActionTypes.DELETE_PRODUCT)
    private deleteProductAction!: DeleteProductAction;

    @shoppingCartModule.Action(ShoppingCartActionTypes.REMOVE_PRODUCT)
    private decreaseProductAction!: RemoveProductAction;

    @shoppingCartModule.Action(ShoppingCartActionTypes.ADD_PRODUCT)
    private addProductAction!: AddProductAction;

    constructor() {
        super();
    }

    private addProduct(item: ShoppingCartItem) {
        this.addProductAction(item);
    }

    private decreaseProduct(item: ShoppingCartItem) {
        this.decreaseProductAction(item);
    }

    private removeItem(item: ShoppingCartItem) {
        this.deleteProductAction(item);
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