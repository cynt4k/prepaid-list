<template>
  <navigation-toolbar-layout>
    <template>
      <v-container class="home" fluid fill-height>
        <v-layout align-center justify-center text-xs-center wrap class="btn-list-layout content-container">
            <template v-for="category in categories">
                <big-button-flex :key="category.name" :icon="category.icon" :title="category.name"></big-button-flex>
            </template>
        </v-layout>
      </v-container>
    </template>
  </navigation-toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';

@Component({ components: { NavigationToolbarLayout, BigButtonFlex } })
export default class BuyProduct extends Vue {
  private categories: Category[] = [];

  constructor() {
    super();
    this.categories.push({ name: 'Kaffee', icon:'mdi-coffee' });
    this.categories.push({ name: 'Bier', icon: 'mdi-bottle-wine'});
    this.categories.push({ name: 'Softgetränke', icon:'mdi-cup-water' });
    this.categories.push({ name: 'TK-Produkte',  icon: 'mdi-pizza'});
    this.categories.push({ name: 'Snacks', icon:'mdi-food-croissant' });
    this.categories.push({ name: 'Divers', icon:'mdi-fish' });
  }
}
</script>
<style lang="scss" scoped>
.content-container {
  overflow: auto;
}
</style>
