<template>
  <v-list-item class="navigation-button" :to="{name: nameOfRoute}" :class="{active: isOnRoute}">
    <v-list-item-action class="navigation-button-action">
      <v-icon dark>{{icon}}</v-icon>
    </v-list-item-action>
    <v-list-item-content class="navigation-button-content">
      <v-list-item-title class="title">{{title}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
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
.navigation-button >>> a {
  color: white !important;
}
</style>
