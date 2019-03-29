<template>
  <v-footer>
    <slot/>
    <v-btn color="success" class="next-btn">
        Bestätigen
        <v-icon right>mdi-check-circle-outline</v-icon>
      </v-btn>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class ConfirmationNavigationFooter extends Vue {
  @Prop({ default: null })
    private buttonTitleNext!: string;
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
.cart-chip > span {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer !important;
}

.scaleInAndOut {
    animation-name: scaleInAndOut;
    z-index: 8;
}
@keyframes scaleInAndOut {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
.animated {
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-direction: alternate;
}
</style>
