<template>
  <div class="toolbar-layout">
    <v-toolbar app>
      <v-btn v-if="showBackBtn" icon @click="$router.go(-1)">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <slot name="toolbar"></slot>
      <v-spacer></v-spacer>
      <span v-if="showUserAndLogout">
        <v-chip slot="activator" color="green" text-color="white" class="credit-chip">
          <v-avatar class="green darken-4">
            <v-icon style="font-size: 22px">mdi-cash</v-icon>
          </v-avatar>
          {{user ? user.credit : 0 | currency}}
        </v-chip>
      </span>
      <span v-if="showUserAndLogout">
        <v-chip slot="activator" color="blue" text-color="white" class="user-chip">
          <v-avatar class="blue darken-4">
            <v-icon style="font-size: 22px">mdi-account</v-icon>
          </v-avatar>
          {{user ? user.nick : ''}}
        </v-chip>
      </span>
      <!-- <span v-if="showUserAndLogout" class="user-display">{{user ? user.nick : ''}}</span> -->
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

import { User } from '@/interfaces/User';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';
import { UserActionTypes, ResetUserAction } from '@/store/user-state';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({
    filters: {
        currency(s: number) {
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return formatter.format(s);
        },
    },
})
export default class ToolbarLayout extends Vue {
    @userModule.Action(UserActionTypes.RESET_STATE)
    private resetUserAction!: ResetUserAction;

    @userModule.Getter
    private user!: User;

    @Prop({ default: false })
    private showBackBtn!: boolean;

    @Prop({ default: false })
    private showUserAndLogout!: boolean;

    private logout() {
        setTimeout(() => {
            this.$router.push({ name: 'Home' });
            this.resetUserAction(undefined);
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

.credit-chip > span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer !important;
}

.user-chip > span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer !important;
}

.user-display {
    font-style: bold;
}
</style>
