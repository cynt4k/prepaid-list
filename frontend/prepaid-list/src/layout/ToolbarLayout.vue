<template>
  <div class="toolbar-layout">
    <v-toolbar app>
      <v-btn v-if="showBackBtn" icon @click="$router.go(-1)">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <slot name="toolbar"></slot>
      <v-spacer></v-spacer>
      <span v-if="showUserAndLogout">{{user ? user.nick : ''}}</span>
      <v-btn v-if="showUserAndLogout" flat icon color="red" title="Logout" @click="logout()">
        <v-icon dark>mdi-logout-variant</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content style="height: 100%" class="page-content">
      <slot></slot>
    </v-content>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { User } from '../interfaces/User';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';
import { UserActionTypes, ChangeUserAction } from '../store/user-state';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({})
export default class ToolbarLayout extends Vue {
    @userModule.Action(UserActionTypes.CHANGE_USER)
    private changeUserAction!: ChangeUserAction;

    @userModule.Getter
    private user!: User;

    @Prop({ default: false })
    private showBackBtn!: boolean;

    @Prop({ default: false })
    private showUserAndLogout!: boolean;

    private logout() {
        //localStorage.user = null;
        setTimeout(() => {
            this.$router.push({ name: 'Home' });
            this.changeUserAction(undefined);
        }, 100);
    }
}
</script>

<style lang="scss">
.toolbar-layout {
    height: 100%;
}
.page-content > div {
    display: flex;
    flex-flow: column;
}
</style>
