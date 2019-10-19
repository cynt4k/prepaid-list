<template>
  <v-app dark style="height: 100vh;">
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
  },
  data: (): object => ({
    //
  }),
});
</script>
