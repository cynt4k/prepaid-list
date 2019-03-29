<template>
     <navigation-toolbar-layout
    titleFirst="Produkt"
    titleSecond="kaufen"
    style="display:flex; flex-layout:column"
  >
  
     </navigation-toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';

@Component({ components: { NavigationToolbarLayout } })
export default class Confirmation extends Vue {

}
</script>

<style lang="scss">

</style>
