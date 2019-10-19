<template>
  <v-container class="home" fluid fill-height>
    <v-layout
      align-center
      justify-center
      text-xs-center
      wrap
      row
      class="btn-list-layout content-container"
    >
      <div class="numpad">
        <div class="output">
          <v-text-field readonly solo single-line reverse hide-details :value="input | currency"></v-text-field>
          <v-btn flat icon @click="removeValue()">
            <v-icon>mdi-backspace</v-icon>
          </v-btn>
        </div>
        <div class="numpad-buttons">
          <big-button v-for="index in 9" :key="index" :title="index" @click="appendValue(index)"></big-button>
          <big-button title="0" @click="appendValue(0)"></big-button>
        </div>
      </div>
      <div class="fast-access">
        <v-card class="card">
          <v-card-title class="font-weight-light fast-access-title">Schnellauswahl</v-card-title>
          <template v-for="price in fixedPrices">
            <big-button
              :disabled="input != 0"
              :key="price.value"
              :title="price.value + ' €'"
              @click="setValue(price.value)"
            ></big-button>
          </template>
        </v-card>
      </div>
    </v-layout>
    <recharge-navigation-footer @next="confirmationDialog = true" :noInput="input == 0"/>

    <v-dialog v-model="confirmationDialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline" primary-title>
          <v-icon style="margin-right: 15px;">mdi-cash-multiple</v-icon>Betrag einzahlen
        </v-card-title>

        <v-card-text>
          Der Geldbetrag wird eingezahlt:
          <span
            style="margin-left: auto; font-size: 30px;"
          >{{input| currency}}</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="red" flat @click="cancel()">Abbrechen</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="accept()">Bestätigen</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirmation-dialog
      v-model="showConfirmation"
      text="Erfolgreich aufgeladen!"
      @next="redirect()"
    />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NavigationToolbarLayout from '@/layout/NavigationToolbarLayout.vue';
import { Category } from '@/interfaces/Category';
import BigButtonFlex from '@/components/BigButtonFlex.vue';
import BigButton from '@/components/BigButton.vue';
import RechargeNavigationFooter from '@/components/RechargeNavigationFooter.vue';
import ShoppingCartDialog from '@/components/ShoppingCartDialog.vue';
import { IProductService } from '@/types';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { ILanguageTranslation } from '@/interfaces/services';
import { IProfileService } from '@/types';
import { IBalanceUpdateModel, IUserModel } from '../interfaces/services';
import {
    UserActionTypes,
    ChangeUserAction,
    UpdateBalanceAction,
} from '@/store/user-state';
import { namespace } from 'vuex-class';
import { StateNamespaces } from '@/store/namespaces';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import router from '../router';
import { EventBus } from '../assets/EventBus';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({
    components: {
        NavigationToolbarLayout,
        BigButtonFlex,
        BigButton,
        RechargeNavigationFooter,
        ConfirmationDialog,
    },
    filters: {
        currency(s: number) {
            s = s / 100;
            const formatter: Intl.NumberFormat = new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
            });
            return formatter.format(s);
        },
    },
})
export default class Recharge extends Vue {
    private profileService!: IProfileService;
    private fixedPrices: any = [];
    private input: number;
    private confirmationDialog: boolean = false;
    private showConfirmation: boolean = false;

    @userModule.Action(UserActionTypes.UPDATE_BALANCE)
    private updateBalanceAction!: UpdateBalanceAction;

    constructor() {
        super();
        this.fixedPrices.push({ value: 5 });
        this.fixedPrices.push({ value: 10 });
        this.fixedPrices.push({ value: 20 });
        this.input = 0;
    }
    private mounted() {
        this.profileService = container.get<IProfileService>(
            SERVICE_IDENTIFIER.PROFILE_SERVICE
        );
    }

    private appendValue(value: number) {
        // not more than 100 euro
        if (this.input < 1000) {
            this.input *= 10;
            this.input += value;
        }
    }
    private removeValue() {
        this.input = this.input / 10;
        this.input = Math.trunc(this.input);
    }
    private setValue(value: number) {
        this.input = value * 100;
        this.confirmationDialog = true;
    }

    private cancel() {
        this.confirmationDialog = false;
        this.input = 0;
    }

    private accept() {
        const balance: IBalanceUpdateModel = { amount: this.input / 100 };
        this.profileService.addBalance(balance).subscribe(
            (infos: IUserModel) => {
                this.updateBalanceAction(infos.balance);
                this.confirmationDialog = false;
                this.showConfirmation = true;
            },
            (err: any) => {
                // TODO: onError
                EventBus.$emit('message', { message: err });
            }
        );
    }
    private redirect() {
        router.push({ name: 'Dashboard' });
    }
}
</script>
<style lang="scss" scoped>
.content-container {
    overflow: auto;
    padding: 10px;
}
.home {
    flex-flow: column;
}
.btn-list-layout {
    display: flex;
    flex-flow: row;
}
.numpad {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 70%;
    .numpad-buttons {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        height: inherit;
    }
    .output {
        width: 100%;
        display: flex;
        flex-flow: row;
        margin-left: 10px;

        button {
            margin-left: 7px;
            margin-right: 25px;
        }

        /deep/ input {
            font-size: 40px;
        }
    }
    .big-button {
        width: 31%;
        height: 22%;
        margin: 1%;
    }
}
.fast-access {
    width: 30%;
    height: 100%;
    .card {
        font-size: 29px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .big-button {
        margin: 10px 0;
        height: 21%;
        width: 90%;
    }
    .fast-access-title {
      margin-bottom: auto;
    }
}
</style>
