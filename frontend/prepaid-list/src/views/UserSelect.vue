<template>
  <toolbar-layout :showBackBtn="true">
    <template v-slot:toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Benutzer&nbsp;</span>
        <span class="font-weight-light">Auswahl</span>
      </v-toolbar-title>
    </template>
    <v-container fluid fill-height column>
      <v-layout align-center justify-center text-xs-center column>
        <v-alert :value="true" type="info" class="panel">
          <h2>OTH-Karte scannen (RFID-Reader) oder Benutzer auswählen</h2>
        </v-alert>

        <alphabet-list class="alphabet-list" @user-selected="openDashboard" :items="users"></alphabet-list>
      </v-layout>
    </v-container>
  </toolbar-layout>
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

@Component({ components: { AlphabetList, ToolbarLayout } })
export default class UserSelect extends Vue {
    private users: User[];
    private _api: IApiService;
    private _userService: IUserService;
    private _jwt: IJwtService;

    constructor() {
        super();
        this.users = [];
        this._api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
        this._userService = container.get<IUserService>(SERVICE_IDENTIFIER.USER_SERVICE);
        this._jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
    }

    private mounted() {
        this._api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
        this._userService = container.get<IUserService>(SERVICE_IDENTIFIER.USER_SERVICE);
        this._jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
        this._userService.getAllUser().subscribe((data) => {
          this.users = <User[]> data;
        }, (err) => console.error(err));
        // this._api
        //     .get('user')
        //     .pipe(map(data => data.data))
        //     .subscribe(
        //         data => {
        //             this.users = data;
        //         },
        //         err => console.error(err)
        //     );
    }

    private openDashboard(user: User) {
      this._userService.loginUserByUsername(user.nickname).subscribe((data) => {
        console.log(data);
        this._jwt.saveToken(data.token);
        this._jwt.saveRefreshToken(data.refreshToken);
      }, (e) => {
        console.error(e);
      });
      setTimeout(() => this.$router.push({ name: 'Dashboard' }), 10);
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

