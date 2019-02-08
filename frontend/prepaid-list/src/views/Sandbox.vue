<template>
  <div class="sandBox">
  <v-container fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="layout">
        <button v-on:click="click">Change user</button>
        <div>User from module {{userName}} nickname: {{userNick}} </div>
        <input v-model="nameInput" placeholder="Name">
        <input v-model="nickInput" placeholder="Nickname">
    </v-layout>
  </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { User } from '../interfaces/User';
import { ChangeUserAction, ChangeUserNameAction, ChangeUserNickAction} from '../store/user-state';
import { StateNamespaces } from '../store/namespaces';
const userModule = namespace(StateNamespaces.USER_STATE);
@Component({})
export default class Sandbox extends Vue {
    // @State private user!: UserTest;
    // @Getter private testCounter!: number;
    // @Mutation private changeUser: any;
    // @Action private add: any;
    // @Mutation private testmutation!: any;
    @userModule.Getter private userName!: string;
    @userModule.Getter private userNick!: string;
    @userModule.Action private changeUserNameAction!: ChangeUserNameAction;
    @userModule.Action private changeUserNickAction!: ChangeUserNickAction;
    private nameInput: string;
    private nickInput: string;
    constructor() {
        super();
        this.nameInput = '';
        this.nickInput = '';
    }
    public click() {
        const userAction: ChangeUserAction = {
            user: {
                name: this.nameInput,
                nick: this.nickInput,
            }
        };
        this.changeUserNameAction(userAction);
        this.changeUserNickAction(userAction);
    }
}
</script>
