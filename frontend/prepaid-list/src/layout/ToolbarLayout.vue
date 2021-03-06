<template>
  <div class="toolbar-layout">
    <v-toolbar app>
      <v-btn v-if="showBackBtn" icon @click="$router.go(-1)">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <slot name="toolbar">
        <v-toolbar-title class="headline text-uppercase">
          <div v-if="title">
            <span>{{title.firstPart}}&nbsp;</span>
            <span class="font-weight-light">{{title.secondPart}}</span>
          </div>
          <div v-else>
            <span>Digitale&nbsp;</span>
            <span class="font-weight-light">Prepaid Liste</span>
          </div>
        </v-toolbar-title>
      </slot>
      <v-spacer></v-spacer>
	  <span v-if="user">
		  <auto-logoff/>
	  </span>
      <span v-if="user">
        <v-chip slot="activator" color="green" text-color="white" class="credit-chip">
          <v-avatar class="green darken-4">
            <v-icon style="font-size: 22px">mdi-cash</v-icon>
          </v-avatar>
          {{user ? user.credit : 0 | currency}}
        </v-chip>
      </span>
      <span v-if="user">
        <v-chip slot="activator" color="blue" text-color="white" class="user-chip">
          <v-avatar class="blue darken-4">
            <v-icon style="font-size: 22px">mdi-account</v-icon>
          </v-avatar>
          {{user ? user.nickname : ''}}
        </v-chip>
      </span>
      <!-- <span v-if="showUserAndLogout" class="user-display">{{user ? user.nick : ''}}</span> -->
      <v-btn v-if="user" flat icon color="red" title="Logout" @click="logout()">
        <v-icon dark>mdi-logout-variant</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content style="height: 100%" class="page-content">
      <router-view></router-view>
    </v-content>
  </div>
</template>
<script lang="ts">
import AutoLogoff from '@/components/AutoLogoff.vue';

import { Component, Vue, Prop } from 'vue-property-decorator';

import { User } from '@/interfaces/User';
import { Getter, namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';
import { UserActionTypes, ResetUserAction } from '@/store/user-state';
import { Title } from '@/router';

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
    components: { AutoLogoff },
})
export default class ToolbarLayout extends Vue {
    @userModule.Action(UserActionTypes.RESET_STATE)
    private resetUserAction!: ResetUserAction;

    @userModule.Getter private user!: User;

    @Prop({ default: false })
    private showBackBtn!: boolean;

    @Prop() private title!: Title;

    private logout() {
        this.resetUserAction();
        this.$router.push({ name: 'Home' });
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
