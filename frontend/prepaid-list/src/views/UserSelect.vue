<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center text-xs-center wrap class="layout">
        <alphabet-list class="alphabet-list" @user-selected="openDashboard"></alphabet-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlphabetList from '@/components/AlphabetList.vue';

@Component({components: {AlphabetList}})
export default class UserSelect extends Vue {
    private openDashboard(user:any) {
        console.log("user selected", user);
    }
}
</script>
<style lang="scss" scoped>
.alphabet-list {
    width: 100%;
}
</style>

