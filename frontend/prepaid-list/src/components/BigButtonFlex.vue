<template>
    <v-flex xs12 sm6 md4 lg4 class="big-button-flex">
        <big-button :disabled="disabled" :class="[red == null ? '' : 'red']" class="big-button" :icon="icon" :title="title" @click="emitClick()"></big-button>
    </v-flex>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BigButton from '@/components/BigButton.vue';

@Component({components: {BigButton}})
export default class BigButtonFlex extends Vue {

    @Prop({default: null})
    private icon!: string;
    @Prop({default: null})
    private title!: string;
    @Prop({default: null})
    private red!: string;
    @Prop({default: null})
    private disabled!: string;

    private emitClick() {
        this.$emit('click');
    }

}
</script>
<style lang="scss" scoped>
.big-button-flex {
  padding: 3px;
  height: 50%;
}
.big-button.red {
    background-color:red;
}
</style>

