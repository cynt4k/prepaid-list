<template>
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
            :to="{path: `singleProducts/${category.id}`}"
            :append="true"
          ></big-button-flex>
        </template>
      </v-layout>
    <shopping-cart-dialog v-if="showFooter" v-model="isShoppingCartDialogShown"/>
    <buy-product-navigation-footer v-if="showFooter" @show-shopping-cart-dialog="isShoppingCartDialogShown = true"/>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import BuyProductNavigationFooter from '@/components/BuyProductNavigationFooter.vue';
import ShoppingCartDialog from '@/components/ShoppingCartDialog.vue';
import { IProductService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { ILanguageTranslation } from '../../interfaces/services';

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
    private _productService!: IProductService;

    @Prop({default: true})
    private showFooter!: boolean;

    constructor() {
        super();
    }

    private mounted() {
      this._productService = container.get<IProductService>(SERVICE_IDENTIFIER.PRODUCT_SERVICE);
      // this._productService.getProducts().subscribe((data: any) => console.log(data));
      this._productService.getCategories().subscribe((data) => {
        this.categories = data.map((category) => {
          const translation = ((): ILanguageTranslation => {
            const data = category.name.translations.filter((elem) => elem.languageCode === 'DE');
            if (data.length === 1) {
              return data[0];
            } else {
              return <ILanguageTranslation>{
                languageCode: 'DE',
                name: 'Unbekannt',
                shortname: 'Unbek.'
              };
            }
          })();
          return <Category> {
            name: translation.name,
            icon: 'mdi-pizza',
            id: category.id
          };
        })
      });
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
    padding: 10px;
}
.home {
    flex-flow: column;
}
</style>
