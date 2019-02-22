<template>
  <v-footer>
    <v-chip color="orange" text-color="white">
      <v-avatar class="orange darken-4">
        <v-icon style="font-size: 21px">mdi-cart</v-icon>
      </v-avatar>10,80 €
    </v-chip>
    <v-btn color="success" class="next-btn">Bestätigen
      <v-icon right>mdi-chevron-right-circle</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ComponentName extends Vue {}
</script>

<style lang="scss">
.next-btn {
    margin-left: auto;
    margin-top: 0;
    margin-bottom: 0;
}
footer {
    width: 100%;
    height: 50px !important;
}
</style>
