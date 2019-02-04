<template>
          <v-card class="bigButton" @click="emitClick()">
        <v-layout align-center justify-center
      text-xs-center wrap column
    >
        <v-icon size="100">{{icon}}</v-icon>
        <v-card-title class="title"><h2>{{title}}</h2></v-card-title>
        </v-layout>
      </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
})
export default class BigButton extends Vue {

    @Prop({default: null})
    private icon!: string;
    @Prop({default: null})
    private title!: string;

    private emitClick() {
        this.$emit('click');
    }

}
</script>
<style lang="scss" scoped>
.bigButton {
    cursor: pointer;
    width: 250px;
    height: 250px;
    display: flex;
    .title {
        // align-self: flex-end;
    }
}
</style>

