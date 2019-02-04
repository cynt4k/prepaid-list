<template>
  <div class="home">
  <v-container fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="layout">
      <big-button icon="mdi-account-plus" title="Registrieren" @click="registerUser()"></big-button>
      <big-button icon="mdi-login-variant" title="Login"></big-button>
      <big-button icon="mdi-information" title="Produktinfos"></big-button>
    </v-layout>
  </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {}
</script>
