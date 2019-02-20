<template>
  <toolbar-layout :showBackBtn="true" :showUserAndLogout="true">
    <template v-slot:toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Dash&nbsp;</span>
        <span class="font-weight-light">Board</span>
      </v-toolbar-title>
    </template>
    <v-container fluid fill-height class="content-container">
      <v-layout align-center justify-center text-xs-center column class="btn-list-layout">
        <v-layout align-center wrap fill-height style="width: 100%">
          <big-button-flex icon="mdi-information" title="Produktinfos"></big-button-flex>
          <big-button-flex icon="mdi-beer" title="Produkt kaufen" @click="buyProduct()"></big-button-flex>
          <big-button-flex icon="mdi-cash-multiple" title="Aufladen"></big-button-flex>
          <big-button-flex disabled icon="mdi-settings" title="Einstellungen"></big-button-flex>
          <big-button-flex red icon="mdi-logout-variant" title="Logout" @click="logout()"></big-button-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButton from '@/components/BigButton.vue';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';
import { EventBus } from '@/assets/EventBus';

@Component({ components: { BigButton, BigButtonFlex, ToolbarLayout } })
export default class Dashboard extends Vue {
    private get user() {
        return JSON.parse(localStorage.user).nick;
    }

    private buyProduct() {
        setTimeout(() => this.$router.push({ name: 'BuyProduct' }), 100);
    }

    private logout() {
        localStorage.user = null;
        setTimeout(() => this.$router.push({ name: 'Home' }), 100);
    }

    private mounted() {
      const message = {message: `Servus, ${this.user}`, snackbarType: 'info'};
      EventBus.$emit('message', message);
    }
}
</script>
<style lang="scss" scoped>
.panel {
    width: 100%;
    margin: 10px;
    margin-top: 0;
}

.content-container {
    overflow: auto;
}
</style>
