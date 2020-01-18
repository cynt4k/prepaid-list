<template>
  <v-container fluid fill-height flex-nowrap>
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
import ConfirmationNavigationFooter from '@/components/ConfirmationNavigationFooter.vue';
import ShoppingCart from '@/components/ShoppingCart.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { EventBus, EventBusMessage, SnackbarOptions, TypeColor, TypeColorConverter } from '@/assets/EventBus';
import { userStore, shoppingCartStore } from '@/store';
import Factory from '../../services/factory';
import { INewProductOrder, INewProductExtraOrder, INewOrder, IOrder } from '@/services/entities/api';
import { ShoppingCartItem } from '@/services/entities/ShoppingCartItem';
import { ErrorMessage } from '@/services/entities/ErrorMessage';
import { User } from '@/services/entities/User';

@Component({
  components: {
    ConfirmationNavigationFooter,
    ShoppingCart,
    ConfirmationDialog
  },
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
export default class Confirmation extends Vue {
    private showDialog: boolean = false;

    private get user(): User | undefined {
      return userStore.user;
    }

    private get shoppingCartSum(): number {
      return shoppingCartStore.shoppingCartSum;
    }
    private get shoppingCartItems(): ShoppingCartItem[] {
      return shoppingCartStore.shoppingCartItem;
    }

    private acceptOrder() {
      // TODO: Put into store. No service call in vue compoenent.
      const products: INewProductOrder[] = [];
      this.shoppingCartItems.forEach((element: ShoppingCartItem) => {
        const extras: INewProductExtraOrder[] = ((): INewProductExtraOrder[] => {
          if (element.productExtra) {
            return [{
              productId: element.productExtra.id,
              quantity: 1
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
      Factory.getInstance().OrderService.placeOrder(order).subscribe(
        (resOrder: IOrder) => {
          userStore.updateBalance(resOrder.user.balance);
          shoppingCartStore.resetState();
          this.showDialog = true;
        },
        (error: any) => {
          const errorCode: string = error.response.data.message;
          const message: ErrorMessage = Factory.getInstance().ErrorHandlingService.translateError(errorCode, '');
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
