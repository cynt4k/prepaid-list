<template>
  <v-container class="register" align-center justify-center text-xs-center fluid fill-height>
    <v-card flat>
      <v-container justify-center align-center v-if="registering">
        <!-- <v-layout align-center justify-center text-xs-center wrap class="btn-list-layout"> -->
        <v-progress-circular :size="200" color="primary" indeterminate></v-progress-circular>
        <h4>Register</h4>
        <v-btn class="back-to-home-btn" flat color="red">Abbrechen</v-btn>
      </v-container>
      <v-form v-if="!registering" ref="form" @submit.prevent="submit">
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <!-- Vorname -->
            <v-flex xs12 sm6>
              <v-text-field
                v-model="firstName"
                :rules="chkNotEmptyRule"
                color="green darken-2"
                label="Vorname"
                required
              ></v-text-field>
            </v-flex>

            <!-- Nachname -->
            <v-flex xs12 sm6>
              <v-text-field
                v-model="lastName"
                :rules="chkNotEmptyRule"
                color="blue darken-2"
                label="Nachname"
                required
              ></v-text-field>
            </v-flex>

            <!-- Nick -->
            <v-flex xs12 sm6>
              <v-text-field
                v-model="nick"
                :rules="chkNotEmptyRule"
                color="blue darken-2"
                label="Nick"
                required
              ></v-text-field>
            </v-flex>

            <!-- EMail -->
            <v-flex xs12>
              <v-text-field v-model="email" :rules="emailRules" required color="teal">
                <div slot="label">E-Mail</div>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-checkbox v-model="acceptTerms" color="green">
                <div slot="label">
                  Hiermit akzeptiere ich die
                  <a @click.stop="terms = true">Nutzungsbedingungen</a>
                  der digitalen Getränkeliste.
                </div>
              </v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat @click="resetForm" :to="{name: 'Home'}">Abbrechen</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!formIsValid" flat color="primary" type="submit">Registrieren</v-btn>
        </v-card-actions>
      </v-form>

      <!-- Nutzungsbedingungen -->
      <v-dialog v-model="terms" width="70%">
        <v-card>
          <v-card-title class="title">Terms</v-card-title>
          <v-card-text
            v-for="n in 5"
            :key="n"
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="green" @click="terms = false">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';
import { IApiService, IUserService, IJwtService } from '@/types';
import { container } from '../inversify.config';
import { SERVICE_IDENTIFIER } from '@/models/Identifiers';
import {
    IUserRegister,
    IResponseToken,
    IApiResponse,
} from '../interfaces/services';
import { tap, catchError } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { namespace } from 'vuex-class';
import { StateNamespaces } from '../store/namespaces';
import { UserActionTypes, RegisterUserAction } from '../store/user-state';
import { User } from '../interfaces/User';
import { EventBus } from '@/assets/EventBus';

const userModule = namespace(StateNamespaces.USER_STATE);

@Component({ components: { ToolbarLayout } })
export default class Register extends Vue {
    @userModule.Action(UserActionTypes.REGISTER_USER)
	private registerUserAction!: RegisterUserAction;
	
    private firstName: string = '';
    private lastName: string = '';
    private nick: string = '';
    private email: string = '';
    private acceptTerms: boolean = false;
    private snackbar: boolean = false;
    private terms: boolean = false;

    private registering: boolean = false;
    private api!: IApiService;
    private userService!: IUserService;
    private jwt!: IJwtService;
    private chkNotEmptyRule = [
        (val: any) => (val || '').length > 0 || 'Dieses Feld muss gefüllt sein',
    ];

    private emailRules = [this.emailValid];

    constructor() {
        super();
    }
    private mounted() {
        this.api = container.get<IApiService>(SERVICE_IDENTIFIER.API);
        this.userService = container.get<IUserService>(
            SERVICE_IDENTIFIER.USER_SERVICE
        );
        this.jwt = container.get<IJwtService>(SERVICE_IDENTIFIER.JWT);
    }

    private resetForm() {
        // @ts-ignore
        this.$refs.form.reset();
    }

    private regexMail(val: any) {
        return (val || '').length > 0 && /.+@.+\...+/.test(val);
    }

    private emailValid(val: any) {
        return this.regexMail(val) || 'E-Mailadresse ist ungültig';
    }
    private submit() {
        const newUser: IUserRegister = {
            username: this.nick,
            email: this.email,
            name: {
                firstname: this.firstName,
                lastname: this.lastName,
            },
		};

		try {
			this.registerUserAction(newUser);
			this.registering = false;
			this.snackbar = true;
	
			this.resetForm();
			setTimeout(
				() => this.$router.push({ name: 'Dashboard' }),
				1000
			);
			this.registering = true;
	
			const message = {
				message: 'Registrierung erfolgreich!',
				snackbarType: 'info',
			};
	
			EventBus.$emit('message', { message });

		} catch (err) {
			// TODO - TranslatorService mit einbinden für I18N-Konvertierung
			// TODO - Pruefen auf Code und abhängig von ErrCode Message ausgeben
			const errMessage = {
				message: err.message,
				snackbarType: 'error',
			};

			this.registering = false;

			EventBus.$emit('message', { errMessage });
		}

        // this.userService.registerUser(user).subscribe(
        //     (data: IResponseToken) => {
        //         this.registering = false;
        //         this.snackbar = true;
        //         this.jwt.saveToken(data.token);
        //         this.jwt.saveRefreshToken(data.refreshToken);
        //         this.registerUserAction({
        //             name: this.firstName,
        //             credit: 0.0,
        //             nickname: this.nick,
        //         });
                
        //     },
        //     (err: IApiResponse<any>) => {
        //         // TODO - TranslatorService mit einbinden für I18N-Konvertierung
        //         // TODO - Pruefen auf Code und abhängig von ErrCode Message ausgeben
        //         const errMessage = {
        //             message: err.message,
        //             snackbarType: 'error',
        //         };

        //         this.registering = false;

        //         EventBus.$emit('message', { errMessage });
        //     }
        // );
    }

    get formIsValid() {
        return (
            this.firstName &&
            this.lastName &&
            this.nick &&
            this.regexMail(this.email) &&
            this.acceptTerms
        );
    }
}
</script>
<style lang="scss">
h4 {
    text-align: center;
    padding: 0;
    margin: 15px 0 0 0;
}
.back-to-home-btn {
    margin: 15px 0 -20px 0;
}
</style>