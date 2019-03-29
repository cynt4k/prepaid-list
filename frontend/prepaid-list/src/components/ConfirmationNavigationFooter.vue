<template>
  <v-footer>
    <v-btn color="success" class="next-btn" @click="acceptOrder()">
      Bestätigen
      <v-icon right>mdi-check-circle-outline</v-icon>
    </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmationNavigationFooter extends Vue {
    private acceptOrder(): void {
        // ToDo to backend: send order
        // Reset shopping cart state.
    }
}
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
