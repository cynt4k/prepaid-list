<template>
  <v-footer>
    <v-dialog v-model="showDialog" persistent width="fit-content">
      <v-layout align-center>
        <v-card>
          <v-card-title class="headline">
            <img :src="require(`@/assets/img/confirmation.gif`)">
          </v-card-title>
          <v-card-title>
            <h2>Kauf abgeschlossen!</h2>
          </v-card-title>
        </v-card>
      </v-layout>
    </v-dialog>
    <v-btn
      :disabled="shoppingCartIsEmpty || showDialog"
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

import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';
import Confirmation from '@/views/buy-product/Confirmation.vue';

const shoppingCartModule = namespace(StateNamespaces.SHOPPING_CART_STATE);

@Component({
    components: { Confirmation },
})
export default class ConfirmationNavigationFooter extends Vue {
    @shoppingCartModule.Getter
    private shoppingCartIsEmpty!: boolean;

    private showDialog: boolean = false;

    private acceptOrder(): void {
        this.showDialog = true;
        // setTimeout(() => (this.showDialog = false), 4000);

        // ToDo to backend: send order
        // Reset shopping cart state.
        // update the credit of the current user
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
