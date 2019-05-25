<template>
  <v-container class="home" fluid fill-height>
    <v-layout style="width: 100%" align-center justify-center text-xs-center>
      <div style="width: 100%" class="fill-height" v-if="!isDataLoading && products.length > 0">
        <v-layout fill-height wrap class="btn-list-layout content-container">
          <template v-for="product in products">
            <big-button-flex
              :key="product.name"
              :title="product.name"
              :additional="product | extras | currency(product.extras ? 'ab ' : '')"
              @click="product.extras ? showDialog(product) : addToCart(product)"
            ></big-button-flex>
          </template>
        </v-layout>
      </div>
      <div v-else-if="!isDataLoading">
        <v-layout column>
          <h2 style="margin-bottom:10px">Keine Produkte verfügbar!</h2>
          <v-btn round color="primary" @click="$router.go(-1)">
            <v-icon dark>mdi-arrow-left</v-icon>Zurück zu den Kategorien
          </v-btn>
        </v-layout>
      </div>
    </v-layout>
    <v-dialog v-model="dialogExtraProduct" v-if="selectedProduct">
      <v-card>
        <v-card-title>
          <h2>Typ für {{selectedProduct.name}} auswählen</h2>
        </v-card-title>
        <v-card-text>
          <div class="button-container">
            <big-button-flex
              title="Standard"
              :additional="selectedProduct.price | currency"
              @click="addToCart(selectedProduct)"
            />
            <big-button-flex
              v-for="extra in selectedProduct.extras"
              :key="extra.id"
              :title="extra.name"
              :additional="extra.price + selectedProduct.price | currency"
              @click="addExtraToCart(selectedProduct, extra)"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click="dialogExtraProduct=false">Schließen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <shopping-cart-dialog v-if="showFooter" v-model="isShoppingCartDialogShown"/>
    <buy-product-navigation-footer
      ref="footer"
      v-if="showFooter"
      @show-shopping-cart-dialog="isShoppingCartDialogShown = true"
    />
  </v-container>
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

import ShoppingCartDialog from '@/components/ShoppingCartDialog.vue';

import { StateNamespaces } from '@/store/namespaces';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { IProductService } from '../../types';
import { container } from '../../inversify.config';
import { SERVICE_IDENTIFIER } from '../../models/Identifiers';
import {
    ILanguageTranslation,
    IProductExtra,
    ITranslationModel,
    LanguageCode,
    IProductModel,
} from '../../interfaces/services';

import { EventBus } from '@/assets/EventBus';

const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    components: {
        BigButtonFlex,
        NavigationToolbarLayout,
        BuyProductNavigationFooter,
        ShoppingCartDialog,
    },
    filters: {
        extras(product: Product): number {
            if ((product.extras || []).length !== 0) {
                return product.extras!.reduce(
                    (acc: any, val) => (acc.price < val.price ? acc : val),
                    {}
                ).price;
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
    private isShoppingCartDialogShown: boolean = false;
    private isDataLoading: boolean = false;

    private productService!: IProductService;
    @Prop()
    private category!: string;
    @Prop({ default: true })
    private showFooter!: boolean;

    @shoppingCartModule.Action(ShoppingCartActionTypes.ADD_PRODUCT)
    private addProductAction!: AddProductAction;

    constructor() {
        super();
    }

    private getTranslation(
        translation: ITranslationModel,
        languageCode: string
    ): ILanguageTranslation {
        const data = translation.translations.filter(
            (elem: ILanguageTranslation) => elem.languageCode === languageCode
        );
        if (data.length === 1) {
            return data[0];
        }
        const langCode = languageCode as LanguageCode;
        return {
            languageCode: langCode,
            name: 'Unbekannt',
            shortname: 'Unbek.',
        };
    }

    private mounted() {
        this.productService = container.get<IProductService>(
            SERVICE_IDENTIFIER.PRODUCT_SERVICE
        );
        EventBus.$emit('loading', true);
        this.isDataLoading = true;
        this.productService.getProductsByCategory(this.category).subscribe(
            (products: IProductModel[]) => {
                this.products = products.map((product: IProductModel) => {
                    const translation = this.getTranslation(product.name, 'DE');
                    const extras = ((): ProductExtra[] | undefined => {
                        if (product.extras.length === 0 || !product.extras) {
                            return undefined;
                        }
                        return product.extras.map((extra: IProductExtra) => {
                            const extraTranslation = this.getTranslation(
                                extra.name,
                                'DE'
                            );
                            return {
                                id: extra.id,
                                name: extraTranslation.name,
                                price: extra.price,
                            };
                        });
                    })();
                    return {
                        name: translation.name,
                        id: product.id,
                        price: product.price,
                        icon: 'mdi-pizza',
                        extras,
                    };
                });
            },
            (data: any) => {
                EventBus.$emit('message', { message: data });
            },
            () => {
                EventBus.$emit('loading', false);
                this.isDataLoading = false;
            }
        );
    }

    private showDialog(p: Product) {
        this.dialogExtraProduct = true;
        this.selectedProduct = p;
    }

    private addToCart(p: Product) {
        if (this.showFooter) {
            const item: ShoppingCartItem = { product: p, amount: 1 };
            this.addProductAction(item);
            // @ts-ignore
            // tslint:disable
            this.$refs['footer'].update();
            this.dialogExtraProduct = false;
        }
    }

    private addExtraToCart(product: Product, extra: ProductExtra) {
        if (this.showFooter) {
            const item: ShoppingCartItem = {
                product,
                amount: 1,
                productExtra: extra,
            };
            this.addProductAction(item);
            //@ts-ignore
            this.$refs['footer'].update();
            this.dialogExtraProduct = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
    width: 100%;
    padding: 10px;
}
.button-container {
    display: flex;
    flex-flow: wrap;
}
.home {
    flex-flow: column;
}
</style>
