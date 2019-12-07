<template>
  <div fill-height>
    <v-list class="alphabet-btn-list">
      <template v-for="(item) in alphabet">
        <v-btn
          fab
          small
          :key="item"
          text
          tile
          @mouseenter="scrollToItem(item, $event)"
          @click="scrollToUsers(item)"
        >{{item}}</v-btn>
      </template>
    </v-list>
    <v-list id="alphabet-list" class="alphabet-content">
      <template v-for="(letterObj) in alphaUserList">
        <v-subheader :id="letterObj.letter" :key="letterObj.letter" class="letter-separator">
          <span>{{letterObj.letter}}</span>
        </v-subheader>

        <div class="users" :key="`div.${letterObj.letter}`">
          <template v-for="item in letterObj.users" ref="tempRef">
            <v-list-item class="listitem" :key="item.title" @click="emitUser(item)">
              <v-list-item-avatar>
                <img :src="item.avatar" v-if="item.avatar">
                <v-icon x-large v-else>mdi-account-circle</v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                {{item.nickname}}
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { User } from '@/services/entities/User';

@Component({})
export default class AlphabetList extends Vue {
    @Prop({ default: null })
    private items!: User[];
    private alphaUserList: AlphabetUser[] = [];

    private get alphabet() {
      return [...'abcdefghijklmnopqrstuvwxyz'];
    }

    private mounted() {
      this.onChildChanged([], []);
    }

    @Watch('items')
    private onChildChanged(val: User[], oldVal: User[]) {
      const result = this.items
        .map((user: User) => ({ letter: user.nickname[0], user }))
        .reduce((acc: any, curr) => {
          const letter = curr.letter.toLowerCase();
          (acc[letter] = acc[letter] || []).push(curr.user);
          return acc;
        }, {});
      this.alphaUserList = [];
      this.alphabet.forEach((letter: string) => {
        const obj: AlphabetUser = { letter, users: result[letter] };
        this.alphaUserList.push(obj);
      });
    }

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
    font-size: 10px;
    height: 18px;
    > span {
        text-transform: uppercase;
        font-size: 150%;
    }
}

.users {
    display: flex;
    flex-flow: row wrap;
    .listitem {
        margin: 5px 0;
        width: 50%;
        flex-basis: auto;
    }
    .listitem:nth-last-child(1):nth-child(odd) {
        width: 100%;
    }
}
</style>
