<template>
    <v-container fluid align-center justify-center fill-height>
        <v-form ref="form">
            <v-card>
                <v-container fluid class="px-12">
                    <v-row no-gutters align="center">
                        <v-col cols="auto">
                            <v-text-field
                                v-model="username"
                                color="green darken-2"
                                label="Benutzername"
                                :error-messages="nameErrors()"
                                required
                                @input="$v.username.$touch()"
                                @blur="$v.username.$touch()"
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                color="green darken-2"
                                label="Passwort"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? showPassordIcon.show : showPassordIcon.hide"
                                @click:append="showPassword = !showPassword"
                                :error-messages="passwordErrors()"
                                required
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters align="center" justify="center">
                        <v-col cols="auto">
                            <v-btn @click="submit">Login</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { required, minLength, between } from 'vuelidate/lib/validators';
import { UserModule } from '../../store/modules/user';
import { mdiEye, mdiEyeOff } from '@mdi/js';

@Component({
    name: 'Login',
})
export default class extends Vue {
    private username: string = '';
    private password: string = '';

    private showPassword: boolean = false;
    private showPassordIcon = {
        show: mdiEye,
        hide: mdiEyeOff
    };

    public mounted(): void {
        // NOP
    }

    public validations(): object {
        return {
            username: {
                required
            },
            password: {
                required
            }
        };
    }
    private async submit(): Promise<void> {
        this.$v.$touch();
        await UserModule.login({ username: this.username, password: this.password });
    }

    private nameErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.username.$dirty) return errors;
        if (!this.$v.username.required) {
            errors.push('Benutzername wird benötigt');
        }
        return errors;
    }

    private passwordErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.password.$dirty) return errors;
        if (!this.$v.password.required) {
            errors.push('Passwort wird benötigt');
        }
        return errors;
    }
}

</script>