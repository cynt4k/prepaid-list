<template>
  <!-- <div> -->
  <v-container fluid fill-height class="content-container">
    <v-layout align-center justify-center text-xs-center column class="btn-list-layout">
      <v-alert :value="true" type="info" class="panel">
        <h2>Servus, {{user}}</h2>
      </v-alert>
      <v-layout align-center wrap fill-height style="width: 100%">
          <big-button-flex icon="mdi-information" title="Produktinfos"></big-button-flex>
          <big-button-flex icon="mdi-beer" title="Produkt kaufen"></big-button-flex>
          <big-button-flex icon="mdi-cash-multiple" title="Aufladen"></big-button-flex>
          <big-button-flex disabled icon="mdi-settings" title="Einstellungen"></big-button-flex>
          <big-button-flex red icon="mdi-login-variant" title="Logout" @click="logout()"></big-button-flex>
      </v-layout>
    </v-layout>
  </v-container>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButton from '@/components/BigButton.vue';
import BigButtonFlex from '@/components/BigButtonFlex.vue';

@Component({components: {BigButton, BigButtonFlex}})
export default class Dashboard extends Vue {

  private get user() {
    return JSON.parse(localStorage.user).nick;
  }

  private logout() {
    localStorage.user = null;
    setTimeout( () => this.$router.push({name: 'Home'}), 100);  }
}
</script>
<style lang="scss" scoped>
.panel {
    width: 100%;
    margin: 10px;
    margin-top: 0;
}
.big-button-flex {
  padding: 3px;
}

.content-container {
  overflow: auto;
}
</style>

