<template>

  <v-footer>
    <v-btn
      :disabled="shoppingCartIsEmpty"
      color="success"
      class="confirm-btn"
      @click="acceptOrder()"
    >
      Abschließen
      <v-icon right>mdi-check-circle</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Confirmation from '@/views/buy-product/Confirmation.vue';
import { shoppingCartStore } from '../store';

@Component({
  components: { Confirmation }
})
export default class ConfirmationNavigationFooter extends Vue {
  private get shoppingCartIsEmpty(): boolean {
    return shoppingCartStore.shoppingCartIsEmpty;
  };

  // Todo: Emit mit @Emit?
  private acceptOrder(): void {
    this.$emit('next');
  }
}
</script>

<style lang="scss" scoped>
.confirm-btn {
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
}
footer {
    width: 100%;
    height: 50px !important;
}
</style>
