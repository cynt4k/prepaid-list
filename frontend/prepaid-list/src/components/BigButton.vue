<template>
<!-- <v-btn> -->
          <v-btn class="bigButton" @click="emitClick()" :disabled="disabled" :class="[disabled == null ? '' : 'disabled']">
        <v-layout align-center justify-center
      text-xs-center wrap column
    >
        <v-icon size="100" class="icon">{{icon}}</v-icon>
        <v-card-title class="title" ><h2 class="font-weight-light">{{title}}</h2></v-card-title>
        </v-layout>
      </v-btn>
<!-- </v-btn> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class BigButton extends Vue {

    @Prop({default: null})
    private icon!: string;
    @Prop({default: null})
    private title!: string;
    @Prop({default: null})
    private disabled!: string;

    private emitClick() {
        if (!this.disabled) {
            this.$emit('click');
         }
    }

}
</script>
<style lang="scss" scoped>
.bigButton {
    cursor: pointer;
    display: flex;
    height: 100%;
    width: 100%;
}
.bigButton.disabled {
    .title, .icon {
        color: grey;
    }
    
}
</style>

