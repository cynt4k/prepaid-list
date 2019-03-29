<template>
  <v-app dark style="height: 100vh;">
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
@Component({})
export default class App extends Vue {
    private text: string = '';
    private snackbar: boolean = false;
    private snackbarType: string = '';
    private duration: number = 3000;
    private mounted() {
        EventBus.$on('message', (options: any) => {
            this.duration = options.duration ? options.duration : 3000;
            this.snackbar = true;
            this.text = options.message;
            this.snackbarType = options.snackbarType;
        });
    }
}
</script>
