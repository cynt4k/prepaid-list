<template>
  <v-dialog v-model="value" persistent width="fit-content">
    <v-layout align-center>
      <v-card>
        <v-card-title class="headline">
          <img :src="require(`@/assets/img/confirmation.gif`)">
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

    @Watch('value')
    private onChanged(val: boolean, oldVal: boolean) {
        setTimeout(() => {
            this.$emit('next');
        }, 3500);
    }
}
</script>
