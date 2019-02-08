<template>
  <v-app dark style="height: 100vh">
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Digitale </span>
        <span class="font-weight-light">Prepaid Liste</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> 
    </v-toolbar>

    <v-content style="height: 100%">
      <router-view></router-view>
    </v-content> -->
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return {
      //
    };
  }
};
</script>
