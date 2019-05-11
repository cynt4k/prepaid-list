<template>
  <div class="navigation-toolbar-layout">
    <v-navigation-drawer
      :mini-variant.sync="mini"
      absolute
      temporary
      hide-overlay
      class="custom-navigation-drawer"
      mini-variant-width="60"
    >
      <v-toolbar flat class="transparent nav-toolbar" dark>
        <v-list class="pa-0">
          <v-list-tile>
            <v-list-tile-action>
              <v-btn @click.stop="mini = !mini" flat style="width: 100%">
                <v-icon v-if="mini">mdi-chevron-right</v-icon>
                <v-icon v-if="!mini">mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pa-0" dense>
        <navigation-button
          nameOfRoute="Dashboard"
          title="Home"
          icon="mdi-home"
          :class="{hidden: mini}"
        />
        <navigation-button
          nameOfRoute="BuyProduct"
          title="Produkt kaufen"
          icon="mdi-beer"
          :class="{hidden: mini}"
        />
      </v-list>
    </v-navigation-drawer>
    <div class="page-content">
    <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';
import NavigationButton from '@/layout/navigation-drawer/NavigationButton.vue';

@Component({ components: { ToolbarLayout, NavigationButton } })
export default class NavigationToolbarLayout extends Vue {
    @Prop()
    private titleFirst!: string;
    @Prop()
    private titleSecond!: string;
    private mini: boolean = true;
}
</script>

<style lang="scss" scoped>
.custom-navigation-drawer {
    background-color: rgb(33, 33, 33);
    .title {
        height: unset;
        font-weight: 300;
    }
}
.nav-toolbar {
    justify-content: center;
    display: flex;
}
.custom-navigation-drawer {
    transform: translateX(0px) !important;
}
</style>
<style lang="scss">
.navigation-toolbar-layout {
  height: 100%;
    .navigation-button.hidden {
        a {
            justify-content: center;
        }
        .navigation-button-content {
            display: none;
        }
    }
    .page-content {
        padding-left: 60px;
        height: 100%;
        > div {
          padding: 0;
        }
    }
}
</style>

