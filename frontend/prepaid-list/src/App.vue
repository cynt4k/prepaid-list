<template>
  <v-app dark style="height: 100vh;">
    <div v-if="isLoading" class="loading">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-snackbar top v-model="snackbar" :color="snackbarType" :timeout="duration">
      <v-alert :value="true" :type="snackbarType" class="panel">
        <h3>{{text}}</h3>
      </v-alert>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EventBus } from '@/assets/EventBus';

import axios from 'axios';
import VueRx from 'vue-rx';

Vue.use(VueRx);

@Component({})
export default class App extends Vue {
    private text: string = '';
    private snackbar: boolean = false;
    private snackbarType: string = '';
    private duration: number = 3000;
    private isLoading: boolean = false;

    private mounted() {
        EventBus.$on('message', (options: any) => {
            this.duration = options.duration ? options.duration : 3000;
            this.snackbar = true;
            this.text = options.message;
            this.snackbarType = options.snackbarType;
        });

        EventBus.$on('loading', (isLoading: boolean) => {
            this.isLoading = isLoading;
        });
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