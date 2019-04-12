<template>
  <navigation-toolbar-layout
    titleFirst="Produkt"
    titleSecond="kaufen"
    style="display:flex; flex-layout:column"
  >
    <v-container class="home" fluid fill-height>
      <v-layout
        align-center
        justify-center
        text-xs-center
        wrap
        class="btn-list-layout content-container"
      >
        <template v-for="category in categories">
          <big-button-flex
            :key="category.name"
            :icon="category.icon"
            :title="category.name"
            :to="{name: 'SingleProducts', params: {category: category.id}}"
          ></big-button-flex>
        </template>
      </v-layout>
    </v-container>
    <buy-product-navigation-footer />
  </navigation-toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import BuyProductNavigationFooter from '@/components/BuyProductNavigationFooter.vue';
import { IProductService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';

@Component({
    components: { NavigationToolbarLayout, BigButtonFlex, BuyProductNavigationFooter },
})
export default class BuyProduct extends Vue {
    private categories: Category[] = [];
    private _productService: IProductService;

    constructor() {
        super();
        this._productService = container.get<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE);
        this.categories.push({ name: 'Kaffee', icon: 'mdi-coffee', id: 1 });
        this.categories.push({ name: 'Bier', icon: 'mdi-bottle-wine,', id: 2 });
        this.categories.push({
            name: 'Softgetränke',
            icon: 'mdi-cup-water',
            id: 3,
        });
        this.categories.push({
            name: 'TK-Produkte',
            icon: 'mdi-pizza,',
            id: 4,
        });
        this.categories.push({
            name: 'Snacks',
            icon: 'mdi-food-croissant',
            id: 5,
        });
        this.categories.push({ name: 'Divers', icon: 'mdi-fish', id: 6 });
    }

    private mounted() {
      this._productService = container.get<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE);
      // this._productService.getProducts().subscribe((data: any) => console.log(data));
      this._productService.getCategories().subscribe((data) => console.log(data));
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
}
.home {
    flex-flow: column;
}
</style>
