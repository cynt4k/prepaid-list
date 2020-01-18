<template>
  <v-footer>
    <v-chip
      color="orange"
      text-color="white"
      class="cart-chip"
      :class="{'scaleInAndOut animated': animate}"
      @click="$emit('show-shopping-cart-dialog')"
      @animationend="animate = false"
    >
      <v-avatar class="orange darken-4">
        <v-icon style="font-size: 21px">mdi-cart</v-icon>
      </v-avatar>
      {{shoppingCartSum | currency}}
    </v-chip>

    <v-btn
      :disabled="shoppingCartIsEmpty"
      color="success"
      class="next-btn"
      :to="{name: 'Confirmation'}"
    >
      Weiter
      <v-icon right>mdi-chevron-right-circle</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ShoppingCart from '@/components/ShoppingCart.vue';
import { shoppingCartStore } from '../store';

@Component({
  filters: {
    currency(s: number) {
      const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
        style: 'currency',
        currency: 'EUR'
      });
      return formatter.format(s);
    }
  },
  components: { ShoppingCart }
})
export default class BuyProductNavigationFooter extends Vue {
    private animate: boolean = false;

    get shoppingCartSum(): number {
      return shoppingCartStore.shoppingCartSum;
    }

    get shoppingCartIsEmpty(): boolean {
      return shoppingCartStore.shoppingCartIsEmpty;
    }

    public update() {
      this.animate = true;
    }
}
</script>

<style lang="scss">
.next-btn {
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
}
footer {
    width: 100%;
    height: 50px !important;
}
.cart-chip > span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer !important;
}

.scaleInAndOut {
    animation-name: scaleInAndOut;
    z-index: 8;
}
@keyframes scaleInAndOut {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
.animated {
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-direction: alternate;
}
</style>
