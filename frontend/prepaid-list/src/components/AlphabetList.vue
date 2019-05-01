<template>
  <div fill-height>
    <v-list class="alphabet-btn-list">
      <template v-for="(item) in alphabet">
        <v-btn
          fab
          small
          :key="item"
          flat
          @mouseenter="scrollToItem(item, $event)"
          @click="scrollToUsers(item)"
        >{{item}}</v-btn>
      </template>
    </v-list>
    <v-list id="alphabet-list" two-line class="alphabet-content">
      <template v-for="(letterObj) in alphaUserList">
        <v-subheader :id="letterObj.letter" :key="letterObj.letter" class="letter-separator">
          <span>{{letterObj.letter}}</span>
        </v-subheader>

        <template v-for="item in letterObj.users" ref="tempRef">
          <v-list-tile :key="item.title" avatar @click="emitUser(item)" ripple>
            <v-list-tile-avatar>
              <img :src="item.avatar" v-if="item.avatar">
              <v-icon x-large v-else>mdi-account-circle</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <!-- <v-list-tile-title v-html="item.name"></v-list-tile-title> -->
              <v-list-tile-sub-title v-html="item.nickname"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action></v-list-tile-action>
          </v-list-tile>
        </template>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '@/interfaces/User';

@Component({})
export default class AlphabetList extends Vue {
    @Prop({ default: null })
    private items!: User[];
    private alphaUserList: AlphabetUser[] = [];

    constructor() {
        super();
    }

    private get alphabet() {
        return [...'abcdefghijklmnopqrstuvwxyz'];
    }

    private subscriptions() {}

    @Watch('items')
    onChildChanged(val: User[], oldVal: User[]) {
        const result = this.items
            .map(user => ({ letter: user.nickname[0], user }))
            .reduce((acc: any, curr) => {
                const letter = curr.letter.toLowerCase();
                (acc[letter] = acc[letter] || []).push(curr.user);
                return acc;
            }, {});
            
        this.alphabet.forEach((letter: string) => {
            const obj: AlphabetUser = { letter, users: result[letter] };
            this.alphaUserList.push(obj);
        });
    }

    private mounted() {}

    private emitUser(item: any) {
        this.$emit('user-selected', item);
    }

    private scrollToUsers(letter: string) {
        const el = document.getElementById(letter);
        const list = document.getElementById('alphabet-list');
        const offset = 100;
        if (el && list) {
            list.scrollTop = el.offsetTop - offset;
        }
    }

    private scrollToItem(letter: string, event: any) {
        if (event.buttons) {
            this.scrollToUsers(letter);
        }
    }
}

interface AlphabetUser {
    letter: string;
    users: User[];
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
        scroll-behavior: smooth;
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
.letter-separator {
    background-color: grey;
    > span {
        text-transform: uppercase;
        font-size: 150%;
    }
}
</style>

