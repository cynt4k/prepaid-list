<template>
  <navigation-toolbar-layout titleFirst="Produkt" titleSecond="kaufen">
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
    <shopping-cart-dialog v-model="isShoppingCartDialogShown"/>
    <buy-product-navigation-footer @show-shopping-cart-dialog="isShoppingCartDialogShown = true"/>
  </navigation-toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import BuyProductNavigationFooter from '@/components/BuyProductNavigationFooter.vue';
import ShoppingCartDialog from '@/components/ShoppingCartDialog.vue';

@Component({
    components: {
        NavigationToolbarLayout,
        BigButtonFlex,
        BuyProductNavigationFooter,
        ShoppingCartDialog,
    },
})
export default class BuyProduct extends Vue {
    private categories: Category[] = [];
    private isShoppingCartDialogShown: boolean = false;

    constructor() {
        super();
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
	
	// private showShoppingCartDialog() {
	// 	this.showShoppingCartDialog = true;
	// 	console.log('flag set');
	// }

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
