<template>
  <v-container fluid fill-height column style="flex-flow:column">
      <v-alert :value="true" type="info" class="panel">
        <h2>OTH-Karte scannen (RFID-Reader) oder Benutzer auswählen</h2>
      </v-alert>
    <v-layout align-center justify-center text-xs-center column style="width:100%">
      <alphabet-list class="alphabet-list" @user-selected="openDashboard" :items="users"></alphabet-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { inject } from 'inversify';
import AlphabetList from '@/components/AlphabetList.vue';
import { User } from '@/interfaces/User';
import { map } from 'rxjs/operators';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';
import { SERVICE_IDENTIFIER } from '../models/Identifiers';
import { ApiService } from '../services/api';
import { container } from '../inversify.config';
import { IApiService, IUserService, IJwtService } from '@/types';

import { UserActionTypes, ChangeUserAction } from '../store/user-state';
import { Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';
import { IResponseToken, IUserModel, IUser } from '../interfaces/services';
import { EventBus } from '@/assets/EventBus';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({ components: { AlphabetList, ToolbarLayout } })
export default class UserSelect extends Vue {
    @userModule.Action(UserActionTypes.CHANGE_USER)
    private changeUserAction!: ChangeUserAction;

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
        this.userService.getAllUser().subscribe(
            (data: IUser[]) => {
                this.users =  data;
            },
            (err: any) => EventBus.$emit('message', { message: err })
        );
    }

    private openDashboard(user: User) {
        this.userService.loginUserByUsername(user.nickname).subscribe(
            (data: IResponseToken) => {
                this.jwt.saveToken(data.token);
                this.jwt.saveRefreshToken(data.refreshToken);
                this.userService
                    .getUserInfos()
                    .subscribe((infos: IUserModel) => {
                        this.changeUserAction({
                            name: infos.username,
                            credit: infos.balance,
                            nickname: infos.username,
                        });
                        setTimeout(
                            () => this.$router.push({ name: 'Dashboard' }),
                            10
                        );
                    });
            },
            (err: any) => {
                EventBus.$emit('message', { message: err });
            }
        );
    }
}
</script>
<style lang="scss" scoped>
.alphabet-list {
    width: 100%;
}
.panel {
    width: 100%;
    background-color: grey;
    margin: 10px;
    margin-top: 0;
}
</style>

