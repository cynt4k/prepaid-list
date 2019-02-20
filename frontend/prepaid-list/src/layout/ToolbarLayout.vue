<template>
  <div class="toolbar-layout">
    <v-toolbar app>
      <v-btn v-if="showBackBtn" icon @click="$router.go(-1)">
        <v-icon dark>mdi-arrow-left</v-icon>
      </v-btn>
      <slot name="toolbar"></slot>
      <v-spacer></v-spacer>
      <span v-if="showUserAndLogout">Ganjagecko</span>
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

@Component({})
export default class ToolbarLayout extends Vue {
    @Prop({ default: false })
    private showBackBtn!: boolean;
    @Prop({ default: false })
    private showUserAndLogout!: boolean;
    private logout() {
        localStorage.user = null;
        setTimeout(() => this.$router.push({ name: 'Home' }), 100);
    }
}
</script>

<style lang="scss">
.toolbar-layout {
    height: 100%;
}
</style>
