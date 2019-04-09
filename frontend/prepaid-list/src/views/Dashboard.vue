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
import { userGetters } from '../store/user-state';

import { User } from '@/interfaces/User';
import { UserActionTypes } from '../store/user-state';
import { ChangeUserAction } from '../store/user-state';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';

import { IUserService, IJwtService } from '../types';
import { container } from '../inversify.config';
import { SERVICE_IDENTIFIER } from '../models/Identifiers';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({ components: { BigButton, BigButtonFlex, ToolbarLayout } })
export default class Dashboard extends Vue {
    @userModule.Getter
    private user!: User;
    private _userService: IUserService;
    private _jwtService: IJwtService

    constructor() {
        super();
        this._userService = container.get<IUserService>(
            SERVICE_IDENTIFIER.USER_SERVICE
        );
        this._jwtService = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
    }

    private buyProduct() {
        setTimeout(() => this.$router.push({ name: 'BuyProduct' }), 100);
    }

    private logout() {
        this._jwtService.destoryToken();
        this._jwtService.destoryRefreshToken();
        setTimeout(() => this.$router.push({ name: 'Home' }), 100);
    }

    private mounted() {
        const message = {
            message: `Servus, ${this.user}`,
            snackbarType: 'info',
        };
        this._userService = container.get<IUserService>(SERVICE_IDENTIFIER.USER_SERVICE);
        this._jwtService = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
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

