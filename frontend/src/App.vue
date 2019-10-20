<template>
  <v-app dark style="height: 100vh;">
    <div v-if="isLoading" class="loading">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-snackbar bottom v-model="snackbar" :color="snackbarType" :timeout="duration">
      <h3>{{messageText}}</h3>
      <v-btn text icon color="black" @click="snackbar = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
  EventBus,
  EventBusMessage,
  SnackbarOptions,
  TypeColor
} from '@/assets/EventBus';

import VueRx from 'vue-rx';
import Store, { userStore } from '@/store';
import { RawLocation } from 'vue-router';

Vue.use(VueRx);

@Component({})
export default class App extends Vue {
  private messageText: string = '';
  private snackbar: boolean = false;
  private snackbarType: string = '';
  private duration: number = 3000;
  private isLoading: boolean = false;
  private timer: number = -1;

  private mounted() {
    EventBus.$on(EventBusMessage.MESSAGE, (options: SnackbarOptions) => {
      this.duration = options.duration ? options.duration : 3000;
      this.snackbar = true;
      this.messageText = options.message;
      this.snackbarType = options.snackbarType ? options.snackbarType : 'info';
    });

    EventBus.$on(EventBusMessage.LOADING, (isLoading: boolean) => {
      this.isLoading = isLoading;
      if (isLoading) {
        if (this.timer !== -1) {
          /* before setting new timer, delete old one. */
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const options: SnackbarOptions = {
            message: 'Timeout beim Laden.',
            snackbarType: TypeColor.WARN
          };
          EventBus.$emit(EventBusMessage.MESSAGE, options);
          this.isLoading = false;
        }, 10000);
      } else {
        clearTimeout(this.timer);
        this.timer = -1;
      }
    });

    EventBus.$on('token-invalid', () => {
      // auto logoff if token is invalid
      userStore.resetState();
      // this.resetUserAction();
      this.$router.push({ name: 'Home' });
    });

    EventBus.$on('token-refresh', () => {
      userStore.refreshToken();
    });
    EventBus.$on(EventBusMessage.ROUTING, (route: RawLocation) => {
      this.$router.push(route);
    });
    userStore.initRFIDReader();
  }
}
</script>

<style lang="scss" scoped>
.loading {
  height: 70px;
  width: 70px;
  top: calc(50% - 35px);
  z-index: 99;
  position: absolute;
  left: calc(50% - 35px);
}
</style>
<style>
html {
  overflow-y: auto !important;
}
</style>
