<template>
  <v-progress-circular
    :rotate="-90"
    :size="35"
    :value="currValPercentage"
    :color="getCurrValColor()"
	@click="performTokenRefresh()"
  >{{ getDisplayValue() }}</v-progress-circular>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import { container } from '@/inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import { TimeInterval } from 'rxjs';

import { userGetters, ResetUserAction } from '../store/user-state';

import { User } from '@/interfaces/User';
import { UserActionTypes } from '../store/user-state';
// import { ChangeUserAction } from '../store/user-state';
import { State, Getter, Mutation, Action, namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';

import { EventBus } from '@/assets/EventBus';

import { IUserService, IJwtService } from '../types';

// TODO: UserModule auslagern und zentral verfügbar machen!!
const userModule = namespace(StateNamespaces.USER_STATE);

@Component({})
export default class AutoLogoff extends Vue {
    private currValPercentage: number = 100;
    private jwtService: IJwtService;
    private leftTime!: number;
    private baseTime!: number;
	private interval: any;


    @userModule.Action(UserActionTypes.RESET_STATE)
	private resetUserAction!: ResetUserAction;
	
	@userModule.Getter
	private token!: string;

    constructor() {
        super();
        this.jwtService = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
    }

    mounted() {
		this.leftTime = this.getCurrTimeLeftInSeconds() - 240;
        this.baseTime = this.getMaxTimeLeftInSeconds() - 240;

        this.interval = setInterval(() => {
            this.leftTime = this.getCurrTimeLeftInSeconds() - 240;	// TODO REMOVE BEFORE FLIGHT
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

	public getCurrTimeLeftInSeconds() {
		const decodedToken = this.jwtService.decodeToken(this.token);
        return Math.trunc(decodedToken.exp - this.getCurrentTimeInSeconds());
	}

	public getMaxTimeLeftInSeconds() {
		const decodedToken = this.jwtService.decodeToken(this.token);
        return Math.trunc(decodedToken.exp - decodedToken.iat);
    }

	private performTokenRefresh() {
		try {
			// this.jwtService.refreshToken();
			EventBus.$emit('token-refresh');
		} catch (e) {
			console.log('Error on token refresh -> Perform Auto Logoff');
			this.performAutoLogoff();
		}
	}
	@Watch('token')
	private updateTime(oldVal: any, newVal: any) {
		this.leftTime = this.getCurrTimeLeftInSeconds() - 240;
        this.baseTime = this.getMaxTimeLeftInSeconds() - 240;
	}

	private get decodedToken() {
		console.log('get decoded')
		return this.token;
	}
	// The displayed time is calculated by the following rules:
  	// > 30 seconds it's rounded to the next (bigger) minute value (added 'm' for 'minutes');
  	// <= 30 seconds the seconds value will be displayed (without decimal places; added 's' for 'seconds')
	private getDisplayValue() {
		if (this.leftTime > 30)
			return Math.round(this.leftTime / 60) + 'm';
		else
			return Math.trunc(this.leftTime) + 's';
	}

    // calculates the remaining time in percent
    private calcPercentage(timeLeft: number): number {
        return Math.trunc(timeLeft / (this.baseTime / 100));
    }

    // Callback method for the auto logoff. Creates also a message for the SnackBar and
    // execute the ResetAction of the User (Redirect to Home).
    private performAutoLogoff() {
        console.log('Perform auto logoff');
        const message = {
            message: `Automatische Abmeldung`,
            snackbarType: 'info',
        };
        this.resetUserAction();
        this.$router.push({ name: 'Home' });
        EventBus.$emit('message', message);
    }

    // Determine the color of the timer depending on the current percentage
    private getCurrValColor() {
        if (this.currValPercentage >= 75) {
            return 'primary';
        } else if (this.currValPercentage >= 50) {
            return 'green';
        } else if (this.currValPercentage >= 25) {
            return 'amber';
        } else {
            return 'red';
        }
	}

	private getCurrentTimeInSeconds() {
        return Date.now().valueOf() / 1000;
    }
}
</script>
<style lang="scss">
	.v-progress-circular {
		margin: 1rem;
	}
</style>

