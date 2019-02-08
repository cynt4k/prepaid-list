<template>
  <v-btn
    class="big-button"
    :class="[red == null ? '' : 'red']"
    @click="emitClick()"
    :disabled="disabled"
  >
    <v-layout align-center justify-center text-xs-center wrap column>
      <v-icon size="100">{{icon}}</v-icon>
      <v-card-title class="title">
        <h2 class="font-weight-light">{{title}}</h2>
      </v-card-title>
    </v-layout>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class BigButton extends Vue {
    @Prop({ default: null })
    private icon!: string;
    @Prop({ default: null })
    private title!: string;
    @Prop({ default: null })
    private disabled!: string;
    @Prop({ default: null })
    private red!: string;

    private emitClick() {
        if (!this.disabled) {
            this.$emit('click');
        }
    }
}
</script>
<style lang="scss" scoped>
.big-button {
    cursor: pointer;
    display: flex;
    height: 100%;
    width: 100%;
    margin: 0;
    &.red {
        background-color: red;
    }
}
</style>

