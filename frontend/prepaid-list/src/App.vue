<template>
  <v-app dark style="height: 100vh;">
    <div v-if="isLoading" class="loading">
      <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-snackbar top v-model="snackbar" :color="snackbarType" :timeout="duration">
      <v-alert :value="true" :type="snackbarType" class="panel">
        <h3>{{messageText}}</h3>
      </v-alert>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { EventBus } from '@/assets/EventBus';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';

import axios from 'axios';
import VueRx from 'vue-rx';
import { UserActionTypes, RefreshTokenAction, ResetUserAction } from './store/user-state';

Vue.use(VueRx);

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({})
export default class App extends Vue {
    private messageText: string = '';
    private snackbar: boolean = false;
    private snackbarType: string = '';
    private duration: number = 3000;
	private isLoading: boolean = false;
	
	@userModule.Action(UserActionTypes.REFRESH_TOKEN)
	private refreshTokenAction!: RefreshTokenAction;
	
	@userModule.Action(UserActionTypes.RESET_STATE)
    private resetUserAction!: ResetUserAction;

    private mounted() {
        EventBus.$on('message', (options: any) => {
            this.duration = options.duration ? options.duration : 3000;
            this.snackbar = true;
            this.messageText = options.message;
            this.snackbarType = options.snackbarType;
        });

        EventBus.$on('loading', (isLoading: boolean) => {
            this.isLoading = isLoading;
		});
		
		EventBus.$on('token-invalid', () => {
			// auto logoff if token is invalid
			this.resetUserAction();
			this.$router.push({ name: 'Home' });
		});

		EventBus.$on('token-refresh', () => {
			this.refreshTokenAction();
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