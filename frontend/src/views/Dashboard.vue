<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center text-xs-center column class="btn-list-layout content-container">
      <v-layout align-center wrap fill-height style="width: 100%">
        <big-button-flex
          icon="mdi-information"
          title="Produktinfos"
          :to="{name: 'UserProductInfos'}"
        ></big-button-flex>
        <big-button-flex icon="mdi-beer" title="Produkt kaufen" @click="buyProduct()"></big-button-flex>
        <big-button-flex icon="mdi-cash-multiple" title="Aufladen" :to="{name: 'Recharge'}"></big-button-flex>
        <big-button-flex disabled icon="mdi-settings" title="Einstellungen"></big-button-flex>
        <big-button-flex red icon="mdi-logout-variant" title="Logout" @click="logout()"></big-button-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButton from '@/components/BigButton.vue';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import { EventBus, EventBusMessage, SnackbarOptions, TypeColor } from '@/assets/EventBus';

import { User } from '@/interfaces/User';
// import { ChangeUserAction } from '../store/user-state';
import { IUserService, IJwtService } from '../types';
import store, { userStore } from '../store';
import { getModule } from 'vuex-module-decorators';
import UserModule from '../store/modules/user';

@Component({ components: { BigButton, BigButtonFlex } })
export default class Dashboard extends Vue {
  private get user(): User | undefined {
    return userStore.user;
  }
  private buyProduct() {
    setTimeout(() => this.$router.push({ name: 'BuyProduct' }), 100);
  }

  private logout() {
    userStore.resetState();
    setTimeout(() => this.$router.push({ name: 'Home' }), 100);
  }

  private mounted() {
    const message: SnackbarOptions = {
      message: `Servus, ${this.user ? this.user.nickname : ''}`,
      snackbarType: TypeColor.INFO
    };
    EventBus.$emit(EventBusMessage.MESSAGE, message);
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
