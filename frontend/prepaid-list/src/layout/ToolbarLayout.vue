<template>
  <div class="toolbar-layout">
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Digitale&nbsp;</span>
        <span class="font-weight-light">Prepaid Liste</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="toolbar"></slot>
    </v-toolbar>

    <v-content style="height: 100%" class="page-content">
      <slot></slot>
    </v-content>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ToolbarLayout extends Vue {}
</script>

<style lang="scss">
.toolbar-layout {
    height: 100%;
}
</style>
