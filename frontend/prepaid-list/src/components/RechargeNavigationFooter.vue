<template>
  <v-footer>
    <v-btn :disabled="noInput" color="success" class="next-btn" @click="$emit('next')">
      Einzahlen
      <v-icon right>mdi-check-circle</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';

import ShoppingCart from '@/components/ShoppingCart.vue';

const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    filters: {
        currency(s: number) {
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return formatter.format(s);
        },
    },
    components: { ShoppingCart },
})
export default class BuyProductNavigationFooter extends Vue {
    @Prop({ default: false })
    private noInput!: boolean;

    constructor() {
        super();
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
