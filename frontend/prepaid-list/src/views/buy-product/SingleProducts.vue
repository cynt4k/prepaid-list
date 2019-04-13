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
        <template v-for="product in products">
          <big-button-flex
            :key="product.name"
            :title="product.name"
            :additional="product | extras | currency(product.extras ? 'ab ' : '')"
            @click="product.extras ? showDialog(product) : addToCart(product)"
          ></big-button-flex>
        </template>
      </v-layout>
      <v-dialog v-model="dialogExtraProduct" v-if="selectedProduct">
        <v-card>
          <v-card-title>
            <h2>Typ auswählen</h2>
          </v-card-title>
          <v-card-text>
            <div class="button-container">
              <big-button-flex
                v-for="extra in selectedProduct.extras"
                :key="extra.id"
                :title="extra.name"
                :additional="extra.price | currency"
                @click="addExtraToCart(selectedProduct, extra)"
              />
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="dialogExtraProduct=false">Schließen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <buy-product-navigation-footer ref="footer"/>
  </navigation-toolbar-layout>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import { Product } from '@/interfaces/Product';
import { ProductExtra } from '@/interfaces/ProductExtra';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import BuyProductNavigationFooter from '@/components/BuyProductNavigationFooter.vue';
import { Getter, namespace } from 'vuex-class';
import {
    ShoppingCartActionTypes,
    AddProductAction,
} from '@/store/shoppingcart-state/shoppingcart-state';

import { StateNamespaces } from '@/store/namespaces';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { IProductService } from '../../types';
import { container } from '../../inversify.config';
import { SERVICE_IDENTIFIER } from '../../models/Identifiers';
import {
    ILanguageTranslation,
    IProductExtra,
    ITranslationModel,
} from '../../interfaces/services';

const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    components: {
        BigButtonFlex,
        NavigationToolbarLayout,
        BuyProductNavigationFooter,
    },
    filters: {
        extras(product: Product): number {
            if ((product.extras || []).length !== 0) {
                return product.extras!.reduce((acc, val) =>
                    acc.price < val.price ? acc : val
                , <ProductExtra> {}).price;
            }
            return product.price;
        },
        currency(s: number, prevString: string) {
            prevString = prevString ? prevString : '';
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return prevString + formatter.format(s);
        },
    },
})
export default class SingleProducts extends Vue {
    private products: Product[] = [];
    private dialogExtraProduct: boolean = false;
    private selectedProduct: Product | null = null;

    private _productService!: IProductService;
    @Prop()
    private category!: string;

    @shoppingCartModule.Action(ShoppingCartActionTypes.ADD_PRODUCT)
    private addProductAction!: AddProductAction;

    constructor() {
        super();
        // this.products.push({
        //     name: 'Café Crema',
        //     icon: 'mdi-coffee',
        //     id: 1,
        //     price: 0.3,
        //     extras: [
        //         { name: 'double-shot', price: 0.35 },
        //         { name: 'double-shot+', price: 0.5 },
        //         { name: 'normal', price: 0.3 },
        //     ],
        // });
        // this.products.push({
        //     name: 'Latte Macchiato',
        //     icon: 'mdi-bottle-wine,',
        //     id: 2,
        //     price: 0.5,
        // });
        // this.products.push({
        //     name: 'Heiße Milch',
        //     icon: 'mdi-cup-water',
        //     id: 3,
        //     price: 0.3,
        // });
        // this.products.push({
        //     name: 'Cappuccino',
        //     icon: 'mdi-pizza,',
        //     id: 4,
        //     price: 0.4,
        // });
    }

    private getTranslation(
        translation: ITranslationModel,
        languageCode: string
    ): ILanguageTranslation {
        const data = translation.translations.filter(
            elem => elem.languageCode === languageCode
        );
        if (data.length === 1) {
            return data[0];
        }
        return <ILanguageTranslation>{
            languageCode: languageCode,
            name: 'Unbekannt',
            shortname: 'Unbek.',
        };
    }

    private mounted() {
        this._productService = container.get<IProductService>(
            SERVICE_IDENTIFIER.PRODUCT_SERVICE
        );
        this._productService
            .getProductsByCategory(this.category)
            .subscribe(products => {
                this.products = products.map(product => {
                    const translation = this.getTranslation(product.name, 'DE');
                    // const extras = (): ProductExtra[] => {
                    //     return product.extras.map(extra => {
                    //         return <ProductExtra>{};
                    //     });
                    // };
                    const extras = ((): ProductExtra[] | undefined => {
                      if (product.extras.length === 0 || !product.extras) {
                        return undefined;
                      }
                      return product.extras.map((extra) => {
                        const extraTranslation = this.getTranslation(extra.name, 'DE');
                        return <ProductExtra> {
                          name: extraTranslation.name,
                          price: extraTranslation.price
                        };
                      });
                    })();
                    return <Product>{
                        name: translation.name,
                        id: product.id,
                        price: product.price,
                        icon: 'mdi-pizza',
                        extras: extras
                    };
                });
            });
    }

    private showDialog(p: Product) {
        this.dialogExtraProduct = true;
        this.selectedProduct = p;
    }

    private addToCart(p: Product) {
        const item: ShoppingCartItem = { product: p, amount: 1 };
        this.addProductAction(item);
        this.$refs['footer'].update();
    }

    private addExtraToCart(product: Product, extra: ProductExtra) {
        const item: ShoppingCartItem = {
            product,
            amount: 1,
            productExtra: extra,
        };
        this.addProductAction(item);
        this.$refs['footer'].update();
        this.dialogExtraProduct = false;
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
}
.button-container {
    display: flex;
    flex-flow: wrap;
}
</style>
