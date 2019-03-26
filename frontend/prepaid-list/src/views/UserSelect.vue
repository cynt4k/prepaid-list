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
import AlphabetList from '@/components/AlphabetList.vue';
import { User } from '../interfaces/User';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';

import { UserActionTypes, ChangeUserAction } from '../store/user-state';
import { Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({ components: { AlphabetList, ToolbarLayout } })
export default class UserSelect extends Vue {
    @userModule.Action(UserActionTypes.CHANGE_USER)
    private changeUserAction!: ChangeUserAction;

    private users: User[];

    constructor() {
        super();
        this.users = [];
        this.users.push({ name: 'Andreas', nick: 'Undefined', credit: 2.5 });
        this.users.push({ name: 'Fridtjof', nick: 'Euan', credit: 1.25 });
        this.users.push({ name: 'Feruza', nick: 'Knute', credit: 0.75 });
        this.users.push({ name: 'Apolônia', nick: 'Ural', credit: 21.5 });
        this.users.push({ name: 'Sieghard', nick: 'Caecilia', credit: 10.5 });
        this.users.push({ name: 'Margareta', nick: 'Ilsa', credit: 1.7 });
        this.users.push({ name: 'Bert', nick: 'Stefan', credit: 2.3 });
        this.users.push({ name: 'Alexa', nick: 'Stephanie', credit: 3.5 });
    }

    private openDashboard(user: User) {
        this.changeUserAction(user);
        //localStorage.user = JSON.stringify(user);
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

