<template>
<v-container fluid fill-height class="user-select">
    <v-alert :value="true" type="info" class="panel">
        <h2>OTH-Karte scannen (RFID-Reader) oder Benutzer auswählen</h2>
    </v-alert>
    <v-layout align-center justify-center text-xs-center column class="full-width">
      <alphabet-list class="alphabet-list" @user-selected="loginUser" :items="users"></alphabet-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { inject } from 'inversify';
import AlphabetList from '@/components/AlphabetList.vue';
import { User } from '@/interfaces/User';
import { map } from 'rxjs/operators';
import { SERVICE_IDENTIFIER } from '../models/Identifiers';
import { ApiService } from '../services/api';
import { container } from '../inversify.config';
import { IApiService, IUserService, IJwtService } from '@/types';

import {
    UserActionTypes,
    LoginUserAction,
    SaveTokenAction,
} from '../store/user-state';
import { Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';
import { IResponseToken, IUserModel, IUser } from '../interfaces/services';
import {
    EventBus,
    EventBusMessage,
    SnackbarOptions,
    TypeColor,
} from '@/assets/EventBus';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({ components: { AlphabetList } })
export default class UserSelect extends Vue {
    @userModule.Action(UserActionTypes.LOGIN_USER)
    private loginUserAction!: LoginUserAction;

    @userModule.Action(UserActionTypes.SAVE_TOKEN)
    private saveTokenAction!: SaveTokenAction;

    private users: IUser[];
    private api!: IApiService;
    private userService!: IUserService;
    private jwt!: IJwtService;

    constructor() {
        super();
        this.users = [];
    }

    private mounted() {
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
        this.userService = container.get<IUserService>(
            SERVICE_IDENTIFIER.USER_SERVICE
        );
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
        EventBus.$emit(EventBusMessage.LOADING, true);
        this.userService.getAllUser().subscribe(
            (data: IUser[]) => {
                this.users = data;
                EventBus.$emit(EventBusMessage.LOADING, false);
            },
            (err: any) => {
                const options: SnackbarOptions = {
                    message: err,
                    snackbarType: TypeColor.ERROR,
                };
                EventBus.$emit(EventBusMessage.MESSAGE, options);
                EventBus.$emit(EventBusMessage.LOADING, false);
            }
        );
    }

    private async loginUser(user: User) {
        try {
            await this.loginUserAction(user);
            setTimeout(() => this.$router.push({ name: 'Dashboard' }), 10);
        } catch (err) {
            const options: SnackbarOptions = {
                message: err,
                snackbarType: TypeColor.ERROR,
            };
            EventBus.$emit(EventBusMessage.MESSAGE, { message: err });
        }
    }
}
</script>
<style lang="scss" scoped>
.user-select {
    flex-flow: column;
}
.alphabet-list {
    width: 100%;
}
.panel {
    width: 100%;
    background-color: grey;
    margin: 10px;
    margin-top: 0;
}
.full-width {
    width: 100%;
}
</style>