<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center
      text-xs-center
      wrap
    >
    <big-button icon="mdi-account-plus" title="Benutzer registrieren" @click="registerUser()"></big-button>
    <big-button icon="mdi-login-variant" title="Login"></big-button>
      
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import BigButton from '@/components/BigButton.vue';

@Component({ components: { BigButton } })
export default class HelloWorld extends Vue {

  private registerUser() {
    // noop
  }
}
</script>


<style lang="scss" scoped>

</style>
