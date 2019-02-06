<template>
  <v-container fluid fill-height column>
    <v-layout align-center justify-center text-xs-center column>
    <v-alert :value="true" type="info" class="panel">
        <h2>OTH-Karte scannen (RFID-Reader) oder Benutzer auswählen</h2>
    </v-alert>

        <alphabet-list class="alphabet-list" @user-selected="openDashboard" :items="users"></alphabet-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlphabetList from '@/components/AlphabetList.vue';
import {User} from '@/interfaces/User';

@Component({components: {AlphabetList}})
export default class UserSelect extends Vue {
    private users: User[];

    constructor() {
        super();
        this.users = [];
        this.users.push({name: 'Andreas', nick: 'Undefined'});
        this.users.push({name: 'Fridtjof', nick: 'Euan'});
        this.users.push({name: 'Feruza', nick: 'Knute'});
        this.users.push({name: 'Apolônia', nick: 'Ural'});
        this.users.push({name: 'Sieghard', nick: 'Caecilia'});
        this.users.push({name: 'Margareta', nick: 'Ilsa'});
        this.users.push({name: 'Bert', nick: 'Stefan'});
        this.users.push({name: 'Alexa', nick: 'Stephanie'});
    }

    private openDashboard(user: User) {
        localStorage.user = user;
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

