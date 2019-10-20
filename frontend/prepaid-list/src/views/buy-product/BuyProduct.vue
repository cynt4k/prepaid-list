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
    <buy-product-navigation-footer
      v-if="showFooter"
      @show-shopping-cart-dialog="isShoppingCartDialogShown = true"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import BuyProductNavigationFooter from '@/components/BuyProductNavigationFooter.vue';
import ShoppingCartDialog from '@/components/ShoppingCartDialog.vue';
import { IProductService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import {
    ILanguageTranslation,
    LanguageCode,
    ICategoryModel,
    ITranslationModel,
} from '@/interfaces/services';
import { EventBusMessage, EventBus } from '@/assets/EventBus';

@Component({
    components: {
        BigButtonFlex,
        BuyProductNavigationFooter,
        ShoppingCartDialog,
    },
})
export default class BuyProduct extends Vue {
    private categories: Category[] = [];
    private isShoppingCartDialogShown: boolean = false;
    private productService!: IProductService;

    @Prop({ default: true })
    private showFooter!: boolean;

    constructor() {
        super();
    }

    private mounted() {
        this.productService = container.get<IProductService>(
            SERVICE_IDENTIFIER.PRODUCT_SERVICE
        );
        EventBus.$emit(EventBusMessage.LOADING, true);
        this.productService
            .getCategories()
            .subscribe((categories: ICategoryModel[]) => {
                this.categories = categories.map((category: ICategoryModel) => {
                    const translation = ((): ILanguageTranslation => {
                        const data = category.name.translations.filter(
                            (elem: ILanguageTranslation) =>
                                elem.languageCode === 'DE'
                        );
                        if (data.length === 1) {
                            return data[0];
                        } else {
                            return {
                                languageCode: 'DE' as LanguageCode,
                                name: 'Unbekannt',
                                shortname: 'Unbek.',
                            };
                        }
                    })();
                    return {
                        name: translation.name,
                        icon: 'mdi-pizza',
                        id: category.id,
                    };
                });
                EventBus.$emit(EventBusMessage.LOADING, false);
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
