<template>
  <v-container fluid fill-height>
    <v-card class="shoppingCart">
      <v-card-title>
        <v-icon style="font-size: 21px; margin-right: 10px">mdi-cart</v-icon>
        <h2>Warenkorb</h2>
      </v-card-title>
      <v-divider></v-divider>
      <div>
        <shopping-cart/>
      </div>
    </v-card>

    <confirmation-navigation-footer @next="acceptOrder()"/>
    <confirmation-dialog v-model="showDialog" text="Kauf abgeschlossen!" @next="redirect()"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import ConfirmationNavigationFooter from '@/components/ConfirmationNavigationFooter.vue';

import { User } from '@/interfaces/User';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';

import ShoppingCart from '@/components/ShoppingCart.vue';
import { IOrderService } from '@/types/services/order.service';
import { IErrorHandlingService } from '@/types/services/errorHandling.service';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { INewOrder, INewProductOrder, IOrder, INewProductExtraOrder } from '../../interfaces/services';
import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { ErrorMessage } from '@/interfaces/ErrorMessage';
import {
    UserActionTypes,
    ChangeUserAction,
    UpdateBalanceAction,
} from '@/store/user-state';
import {
    ShoppingCartActionTypes,
    ResetStateAction,
} from '../../store/shoppingcart-state/shoppingcart-state';
import { EventBus, EventBusMessage, SnackbarOptions, TypeColor, TypeColorConverter } from '@/assets/EventBus';

const userModule = namespace(StateNamespaces.USER_STATE);
const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    components: {
        NavigationToolbarLayout,
        ConfirmationNavigationFooter,
        ShoppingCart,
        ConfirmationDialog,
    },
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
export default class Confirmation extends Vue {
    private showDialog: boolean = false;

    @userModule.Getter
    private user!: User;
    @userModule.Action(UserActionTypes.UPDATE_BALANCE)
    private updateBalanceAction!: UpdateBalanceAction;

    @shoppingCartModule.Action(ShoppingCartActionTypes.RESET_STATE)
    private resetShoppingCart!: ResetStateAction;

    @shoppingCartModule.Getter
    private shoppingCartSum!: number;
    @shoppingCartModule.Getter
    private shoppingCartItems!: ShoppingCartItem[];

    private orderService!: IOrderService;
    private errorHandlingService!: IErrorHandlingService;

    private mounted() {
        this.orderService = container.get<IOrderService>(
            SERVICE_IDENTIFIER.ORDER_SERVICE
        );
        this.errorHandlingService = container.get<IErrorHandlingService>(
            SERVICE_IDENTIFIER.ERRORHANDLING_SERVICE
        );
    }

    private acceptOrder() {
        const products: INewProductOrder[] = [];
        this.shoppingCartItems.forEach((element: ShoppingCartItem) => {
            const extras: INewProductExtraOrder[] = ((): INewProductExtraOrder[] => {
                if (element.productExtra) {
                    return [{
                        productId: element.productExtra.id,
                        quantity: 1,
                    }];
                }
                return [];
            })();
            products.push({
                productId: element.product.id,
                quantity: element.amount,
                extras: (extras.length !== 0 ? extras : undefined)
            });
        });
        const order: INewOrder = { products };
        this.orderService.placeOrder(order).subscribe(
            (resOrder: IOrder) => {
                this.updateBalanceAction(resOrder.user.balance);
                this.resetShoppingCart();
                this.showDialog = true;
            },
            (error) => {
                const errorCode: string = error.response.data.message;
                const message: ErrorMessage = this.errorHandlingService.translateError(errorCode, '');
                const typeColor: TypeColor = TypeColorConverter.convertFromErrorMessage(message);
                const options: SnackbarOptions = { message: message.message, snackbarType: typeColor };
                EventBus.$emit(EventBusMessage.MESSAGE, options);
            }
        );
    }
    private redirect() {
        this.$router.push({ name: 'Dashboard' });
    }
}
</script>

<style lang="scss">
.shoppingCart {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: initial !important;
}
</style>
 