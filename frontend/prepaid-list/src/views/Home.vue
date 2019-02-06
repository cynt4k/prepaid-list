<template>
  <v-container class="home" fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="btn-list-layout">
      <big-button-flex icon="mdi-account-plus" title="Registrieren" @click="registerUser()"></big-button-flex>
      <big-button-flex icon="mdi-login-variant" title="Login" @click="login()"></big-button-flex>
      <big-button-flex icon="mdi-information" title="Produktinfos"></big-button-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BigButtonFlex from '@/components/BigButtonFlex.vue';

@Component({components: {BigButtonFlex}})
export default class Home extends Vue {
  private login() {
     setTimeout( () => this.$router.push({name: 'UserSelect'}), 100);
  }
}
</script>
<style lang="scss">
  .btn-list-layout {
    justify-content: space-between;
  }
</style>

