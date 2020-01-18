<template>
  <v-container fluid fill-height class="user-select">
    <v-alert :value="true" type="info" class="panel">
      <h2>OTH-Karte scannen (RFID-Reader) oder Benutzer auswählen</h2>
    </v-alert>
    <v-layout align-center justify-center text-xs-center column class="full-width">
      <alphabet-list class="alphabet-list" @user-selected="loginUser" :items="users"></alphabet-list>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlphabetList from '@/components/AlphabetList.vue';
import { map } from 'rxjs/operators';
import {
  EventBus,
  EventBusMessage,
  SnackbarOptions,
  TypeColor
} from '@/assets/EventBus';
import Factory from '../services/factory';
import { userStore } from '../store';
import { User } from '@/services/entities/User';
import { IUser } from '@/services/entities/api';

@Component({ components: { AlphabetList } })
export default class UserSelect extends Vue {
  private users: User[];

  constructor() {
    super();
    this.users = [];
  }

  private mounted() {
    EventBus.$emit(EventBusMessage.LOADING, true);
    // TODO: Put into store. No service call in vue compoenent.
    Factory.getInstance()
      .UserService.getAllUser()
      .subscribe(
        (data: IUser[]) => {
          this.users = data as any;
          EventBus.$emit(EventBusMessage.LOADING, false);
        },
        (err: any) => {
          const options: SnackbarOptions = {
            message: err,
            snackbarType: TypeColor.ERROR
          };
          EventBus.$emit(EventBusMessage.MESSAGE, options);
          EventBus.$emit(EventBusMessage.LOADING, false);
        }
      );
  }

  private async loginUser(user: User) {
    EventBus.$emit(EventBusMessage.LOADING, true);
    try {
      await userStore.loginUser(user);
      this.$router.push({ name: 'Dashboard' });
    } catch (err) {
      const options: SnackbarOptions = {
        message: err,
        snackbarType: TypeColor.ERROR
      };
      EventBus.$emit(EventBusMessage.MESSAGE, { message: err });
    }
    EventBus.$emit(EventBusMessage.LOADING, false);
  }
}
</script>
<style lang="scss" scoped>
.user-select {
  flex-flow: column;
}
.alphabet-list {
  width: 100%;
}
.panel {
  width: 100%;
  background-color: grey;
  margin: 10px;
  margin-top: 0;
}
.full-width {
  width: 100%;
}
</style>
