<template>
  <div class="sandBox">
  <v-container fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="layout">
        <button v-on:click="click">Change user</button>
        <div>User from module {{user.name}} nickname: {{user.nick}} </div>
        <input v-model="nameInput" placeholder="Name">
        <input v-model="nickInput" placeholder="Nickname">
        <div>Article in cart: {{articleCount}}</div>
    </v-layout>
  </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { User } from '../interfaces/User';
import { ChangeUserAction, ChangeUserNameAction, ChangeUserNickAction, UserActionTypes} from '../store/user-state';
import { StateNamespaces } from '../store/namespaces';
import { CartActionTypes, AddArticleAction } from '@/store/cart-state';
const userModule = namespace(StateNamespaces.USER_STATE);
const cartModule = namespace(StateNamespaces.CART_STATE);
@Component({})
export default class Sandbox extends Vue {

    @cartModule.Getter private articleCount!: number;
    @cartModule.Action(CartActionTypes.ADD_ARTICLE) private addArticle!: AddArticleAction;

    @userModule.Action(UserActionTypes.CHANGE_USER) private changeUserAction!: ChangeUserAction;
    @userModule.Getter private user!: User;
    private nameInput: string;
    private nickInput: string;
    constructor() {
        super();
        this.nameInput = '';
        this.nickInput = '';
    }
    public click() {
        const user: User = {
            name: this.nameInput,
            nick: this.nickInput,
        };
        this.changeUserAction(user);
        this.addArticle(1);
    }
}
</script>
