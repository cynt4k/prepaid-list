<template>
  <v-container class="home" fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="btn-list-layout">
      <big-button icon="mdi-account-plus" title="Registrieren" @click="registerUser()"></big-button>
      <big-button icon="mdi-login-variant" title="Login" @click="login()"></big-button>
      <big-button icon="mdi-information" title="Produktinfos"></big-button>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';
import BigButton from '@/components/BigButton.vue';

@Component({components: {BigButton}})
export default class Home extends Vue {
  private login() {
    router.push({name: 'UserSelect'});
  }
}
</script>
<style lang="scss">
  .btn-list-layout {
    justify-content: space-between;
  }
</style>

