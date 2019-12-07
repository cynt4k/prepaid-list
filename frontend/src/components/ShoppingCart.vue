<template>
  <v-data-table
    :hide-default-footer="true"
    :headers="headers"
    :items="shoppingCartItems"
    class="elevation-1"
  >
    <template v-slot:item.delete="{ item }">
      <v-btn icon color="error" text @click="removeItem(item)">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>

    <template
      v-slot:item.name="{ item }"
    >{{ item.product.name }} {{ item.productExtra ? `(${item.productExtra.name})` : ''}}</template>

    <template v-slot:item.amount="{ item }">
      <v-btn icon text @click="decreaseProduct(item)">
        <v-icon>mdi-minus-circle</v-icon>
      </v-btn>
      {{ item.amount }}
      <v-btn icon text @click="addProduct(item)">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <template
      v-slot:item.price="{ item }"
    >{{ item.product.price + (item.productExtra ? item.productExtra.price : 0) | currency}}</template>
    <template
      v-slot:item.priceSum="{ item }"
    >{{ (item.amount * (item.product.price + (item.productExtra ? item.productExtra.price : 0))) | currency }}</template>
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
import NavigationFooter from '@/components/NavigationFooter.vue';

import { shoppingCartStore } from '../store';
import { ShoppingCartItem } from '@/services/entities/ShoppingCartItem';

@Component({
  filters: {
    currency(s: number) {
      const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
        style: 'currency',
        currency: 'EUR'
      });
      return formatter.format(s);
    }
  }
})
export default class ShoppingCart extends Vue {
  private get shoppingCartItems(): ShoppingCartItem[] {
    return shoppingCartStore.shoppingCartItem;
  }

  private get shoppingCartSum(): number {
    return shoppingCartStore.shoppingCartSum;
  }

  private addProduct(item: ShoppingCartItem) {
    shoppingCartStore.addProduct(item);
  }

  private decreaseProduct(item: ShoppingCartItem) {
    shoppingCartStore.removeProduct(item);
  }

  private removeItem(item: ShoppingCartItem) {
    shoppingCartStore.deleteProduct(item);
  }

  private get headers() {
    return [
      { text: 'Name', sortable: false, value: 'name' },
      { text: 'Anzahl', sortable: false, value: 'amount' },
      { text: 'Einzelpreis', sortable: false, value: 'price' },
      { text: 'Gesamtpreis', sortable: false, value: 'priceSum' },
      { text: 'Entfernen', sortable: false, align: 'right', value: 'delete' }
    ];
  }
}
</script>
