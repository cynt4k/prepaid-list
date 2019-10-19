<template>
  <v-dialog v-model="value" persistent width="fit-content">
    <v-layout align-center>
      <v-card>
        <v-card-title class="headline">
          <img :src="src">
        </v-card-title>
        <v-card-title>
          <h2>{{text}}</h2>
        </v-card-title>
      </v-card>
    </v-layout>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class ConfirmationDialog extends Vue {
    @Prop()
    private value!: boolean;
    @Prop()
    private text!: string;

    private src: string = '';

    @Watch('value')
    private onChanged(val: boolean, oldVal: boolean) {
        this.src = require(`@/assets/img/confirmation.gif`)
        setTimeout(() => {
          this.src = '';
          this.$emit('next');
        }, 1500);
    }
}
</script>
