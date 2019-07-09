<template>
  <v-progress-circular
    v-if="currValPercentage >= 75"
    :rotate="-90"
    :size="35"
    :value="currValPercentage"
    color="primary"
  >{{ leftTime }}</v-progress-circular>

  <!-- Case < 50% -->
  <v-progress-circular
    v-else-if="currValPercentage >= 50"
    :rotate="-90"
    :size="35"
    :value="currValPercentage"
    color="green"
  >{{ leftTime }}</v-progress-circular>

  <!-- Case < 25% -->
  <v-progress-circular
    v-else-if="currValPercentage >= 25"
    :rotate="-90"
    :size="35"
    :value="currValPercentage"
    color="amber"
  >{{ leftTime }}</v-progress-circular>

  <!-- Case Else -->
  <v-progress-circular
    v-else
    :rotate="-90"
    :size="35"
    :value="currValPercentage"
    color="red"
  >{{ leftTime }}</v-progress-circular>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ILogoffService } from '../types/services/logoff.service';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { TimeInterval } from 'rxjs';

import { userGetters, ResetUserAction } from '../store/user-state';

import { User } from '@/interfaces/User';
import { UserActionTypes } from '../store/user-state';
import { ChangeUserAction } from '../store/user-state';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';

import { EventBus } from '@/assets/EventBus';

import { IUserService, IJwtService } from '../types';

// TODO: UserModule auslagern und zentral verfügbar machen!!
const userModule = namespace(StateNamespaces.USER_STATE);

@Component({})
export default class Logoff extends Vue {
    private currValPercentage: number = 100;
    private logoffService: ILogoffService;
    private leftTime: number;
    private baseTime: number;
    private interval: any;

    @userModule.Action(UserActionTypes.RESET_STATE)
    private resetUserAction!: ResetUserAction;

    constructor() {
        super();
        this.logoffService = container.get<ILogoffService>(
            SERVICE_IDENTIFIER.LOGOFF_SERVICE
        );
        this.leftTime = this.logoffService.getCurrTimeLeftInSeconds() - 290;
        this.baseTime = this.logoffService.getMaxTimeLeftInSeconds() - 290;
    }

    mounted() {
        this.interval = setInterval(() => {
            this.leftTime = this.logoffService.getCurrTimeLeftInSeconds() - 290;
            console.log(this.leftTime);
            if (this.leftTime <= 0) {
                this.performAutoLogoff();
                clearInterval(this.interval);
            }
            this.currValPercentage = this.calcPercentage(this.leftTime);
        }, 1000);
    }

    beforeDestroy() {
        clearInterval(this.interval);
    }

    // calculates the remaining time in percent
    private calcPercentage(timeLeft: number): number {
        return Math.trunc(timeLeft / (this.baseTime / 100));
    }

	// Callback method for the auto logoff. Creates also a message for the SnackBar and 
	// execute the ResetAction of the User (Redirect to Home).
    private performAutoLogoff() {
        console.log('It is something :)');
        const message = {
            message: `Auto Logoff`,
            snackbarType: 'info',
        };
        setTimeout(() => {
            this.resetUserAction();
            this.$router.push({ name: 'Home' });
            EventBus.$emit('message', message);
        }, 100);
    }

    private test() {
        if (this.currValPercentage >= 75) {
            return 'primary';
        } else if (this.currValPercentage >= 50) {
            return 'green';
        }
    }
}
</script>
<style lang="scss">
.v-progress-circular {
    margin: 1rem;
}
</style>

