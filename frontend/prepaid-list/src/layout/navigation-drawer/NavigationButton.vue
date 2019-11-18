<template>
  <v-list-tile class="navigation-button" :to="{name: nameOfRoute}" :class="{active: isOnRoute}">
    <v-list-tile-action class="navigation-button-action">
      <v-icon dark>{{icon}}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content class="navigation-button-content">
      <v-list-tile-title class="title">{{title}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class NavigationButton extends Vue {
    @Prop()
    private nameOfRoute!: string;
    @Prop()
    private icon!: string;
    @Prop()
    private title!: string;

    get isOnRoute(): boolean {
        return this.$route.name === this.nameOfRoute;
    }
}
</script>
<style lang="scss" scoped>
.navigation-button {
    &.active {
        background: grey;
    }
    .title {
        height: unset;
        font-weight: 300;
    }
}
.navigation-button /deep/ a {
    color: white !important;
}
</style>
