<template>
  <v-container class="home" fluid fill-height>
    <v-layout
      align-center
      justify-center
      text-xs-center
      wrap
      class="btn-list-layout content-container"
    >
      <template v-for="product in products">
        <big-button-flex :key="product.name" :title="product.name" :additional="product.price | stringFormat"></big-button-flex>
      </template>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import { Product } from '@/interfaces/Product';

@Component({
    components: { BigButtonFlex },
    filters: {
        stringFormat(s: number) {
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return formatter.format(s);
        },
    },
})
export default class SingleProducts extends Vue {
    private products: Product[] = [];

    constructor() {
        super();
        this.products.push({
            name: 'Café Crema',
            icon: 'mdi-coffee',
            id: 1,
            price: 0.3,
        });
        this.products.push({
            name: 'Latte Macchiato',
            icon: 'mdi-bottle-wine,',
            id: 2,
            price: 0.5,
        });
        this.products.push({
            name: 'Heiße Milch',
            icon: 'mdi-cup-water',
            id: 3,
            price: 0.3,
        });
        this.products.push({
            name: 'Cappuccino',
            icon: 'mdi-pizza,',
            id: 4,
            price: 0.4,
        });
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
}
</style>
