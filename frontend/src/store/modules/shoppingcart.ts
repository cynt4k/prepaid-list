import { ShoppingCartItem } from '@/interfaces/ShoppingCartItem';
import { Mutation, Action, getModule, VuexModule, Module } from 'vuex-module-decorators';

/// ////////////////////////////////////
// State
/// ////////////////////////////////////
export interface ShoppingCartState {
    shoppingCart: {
        [key: string]: ShoppingCartItem;
    };
}

function keyFct(item: ShoppingCartItem) {
  return (
    item.product.name + (item.productExtra ? item.productExtra!.name : '')
  );
}

@Module({ name: 'shoppingCart' })
export default class ShoppingCartModule extends VuexModule {
    shoppingCart: { [key: string]: ShoppingCartItem; } = {};

    /// ////////////////////////////////////
    // Mutations
    /// ////////////////////////////////////
    @Mutation
    private addProductMutation(payload: ShoppingCartItem) {
      // TODO: Später auf id ändern: payload.product.id
      const key = keyFct(payload);
      if (this.shoppingCart[key]) {
        payload.amount = this.shoppingCart[key].amount + 1;
      }
      this.shoppingCart = { ...this.shoppingCart, [key]: payload };
    }

    @Mutation
    private removeProductMutation(payload: ShoppingCartItem) {
      const key = keyFct(payload);
      if (this.shoppingCart[key]) {
        payload.amount = this.shoppingCart[key].amount - 1;
      }
      payload.amount = payload.amount > 1 ? payload.amount : 1;
      this.shoppingCart = { ...this.shoppingCart, [key]: payload };
    }

    @Mutation
    private resetStateMutation() {
      this.shoppingCart = {};
    }
    @Mutation
    private deleteProductMutation(payload: ShoppingCartItem) {
      const key = keyFct(payload);
      delete this.shoppingCart[key];
      this.shoppingCart = { ...this.shoppingCart };
    }
    /// ////////////////////////////////////
    // Actions
    /// ////////////////////////////////////
    @Action({ commit: 'addProductMutation' })
    public addProduct(payload: ShoppingCartItem) {
      return payload;
    }

    @Action({ commit: 'removeProductMutation' })
    public removeProduct(payload: ShoppingCartItem) {
      return payload;
    }

    @Action({ commit: 'resetStateMutation' })
    public resetState() {

    }

    @Action({ commit: 'deleteProductMutation' })
    public deleteProduct(payload: ShoppingCartItem) {
      return payload;
    }
    /// ////////////////////////////////////
    // Getters
    /// ////////////////////////////////////
    public get shoppingCartItem(): ShoppingCartItem[] {
      const result: ShoppingCartItem[] = [];

      for (const key in this.shoppingCart) {
        if (this.shoppingCart.hasOwnProperty(key)) {
          result.push(this.shoppingCart[key]);
        }
      }
      return result;
    }
    public get shoppingCartSum(): number {
      let sum: number = 0;
      Object.keys(this.shoppingCart).forEach((key: string) => {
        const item: ShoppingCartItem = this.shoppingCart[key];
        const price =
                item.product.price +
                (item.productExtra ? item.productExtra.price : 0);
        sum += price * this.shoppingCart[key].amount;
      });
      return sum;
    }
    public get shoppingCartIsEmpty(): boolean {
      return this.shoppingCartItem.length === 0;
    }
}
