<template>
    <div  fill-height>
        <v-list class="alphabet-btn-list">
            <template v-for="(item) in alphabet">
                <v-btn fab small :key="item" flat> {{item}}</v-btn>
            </template>
        </v-list>
        <v-list two-line class="alphabet-content">
            <template v-for="(item, index) in items">
                <v-list-tile :key="item.title" avatar @click="emitUser(item)">
                <v-list-tile-avatar>
                    <img :src="item.avatar" v-if="item.avatar">
                    <v-icon x-large v-else>mdi-account-circle</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title v-html="item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="item.nick"></v-list-tile-sub-title>
                </v-list-tile-content>
                </v-list-tile>
            </template>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class AlphabetList extends Vue {
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    
    @Prop({default: null})
    private items: Array<any>;
    constructor() {
        super();
        this.items = [];
        this.items.push({name: 'Andreas', nick: 'Andifined'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});
        this.items.push({name: 'Rolf', nick: 'ruid'});

    }

    private emitUser(item:any) {
        this.$emit('user-selected', item);
    }
}
</script>
<style lang="scss" scoped>
.bigButton {
    cursor: pointer;
    width: 250px;
    height: 250px;
    display: flex;
}
.alphabet-list {
    display: flex;
    height: 100%;
    .alphabet-content {
        width: 100%;
        overflow: auto;
    }
}
.alphabet-btn-list {
    display: flex;
    flex-flow: column;
    > .v-btn {
        height: 3.8%; // 1/26%
        margin: 0;
    }
}
</style>

