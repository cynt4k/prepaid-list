<template>
  <v-footer>
    <v-dialog v-model="menu" origin="left" transition="slide-y-reverse-transition">
      <v-chip slot="activator" color="orange" text-color="white" class="cart-chip">
        <v-avatar class="orange darken-4">
          <v-icon style="font-size: 21px">mdi-cart</v-icon>
        </v-avatar>10,80 €
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
          <v-data-table :hide-actions="true" :headers="headers" :items="cart" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td>
                <v-btn icon flat>
                  <v-icon>mdi-minus-circle</v-icon>
                </v-btn>
                {{ props.item.amount }}3
                <v-btn icon flat>
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </td>
              <td>{{ props.item.amount }}0,30 €</td>
              <td>{{ props.item.amount }}0,90 €</td>
              <td class="text-xs-right">
                <v-btn icon color="error" flat>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </template>
            <template slot="footer">
              <td :colspan="3" class="text-xs-right">
                <strong>Summe:</strong>
              </td>
              <td :colspan="2">
                <strong>5,60 €</strong>
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

@Component({})
export default class ComponentName extends Vue {
    private menu = null;
    private cart: Product[] = [];
    constructor() {
        super();
        const p1: Product = { name: 'Brot', icon: '', id: 1, price: 3.0 };
        const p12: Product = { name: 'Schimmel', icon: '', id: 2, price: 3.0 };
        this.cart.push(p1);
        this.cart.push(p12);
        this.cart.push(p12);
        this.cart.push(p12);
        this.cart.push(p12);
        this.cart.push(p12);
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
</style>
