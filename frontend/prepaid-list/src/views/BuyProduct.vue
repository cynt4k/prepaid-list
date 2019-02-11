<template>
  <v-container class="home" fluid fill-height>
    <v-layout
      align-center
      justify-center
      text-xs-center
      wrap
      class="btn-list-layout content-container"
    >
      <template v-for="category in categories">
        <big-button-flex
          :key="category.name"
          :icon="category.icon"
          :title="category.name"
          :to="{name: 'SingleProducts', params: {category: category.id}}"
        ></big-button-flex>
      </template>
    </v-layout>
      <v-footer>
              <v-chip color="green" text-color="white">
        <v-avatar class="green darken-4"><v-icon style="font-size: 21px">mdi-cart</v-icon></v-avatar>10,80 €
      </v-chip>
      </v-footer>
  </v-container>
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
        this.categories.push({ name: 'Kaffee', icon: 'mdi-coffee', id: 1 });
        this.categories.push({ name: 'Bier', icon: 'mdi-bottle-wine,', id: 2 });
        this.categories.push({
            name: 'Softgetränke',
            icon: 'mdi-cup-water',
            id: 3,
        });
        this.categories.push({
            name: 'TK-Produkte',
            icon: 'mdi-pizza,',
            id: 4,
        });
        this.categories.push({
            name: 'Snacks',
            icon: 'mdi-food-croissant',
            id: 5,
        });
        this.categories.push({ name: 'Divers', icon: 'mdi-fish', id: 6 });
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
}
.home {
  flex-flow: column;
  footer {
    width: 100%;
  }
}
</style>
