<template>
  <toolbar-layout>
    <v-snackbar v-model="snackbar" absolute top center color="success">
      <span>Registrierung erfolgreich!</span>
      <v-icon dark>checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-container class="register" fluid fill-height>
      <v-card flat>
        <v-form ref="form" @submit.prevent="submit">
          <v-container grid-list-xl fluid>
            <v-layout wrap>
              <!-- Vorname -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="firstName"
                  :rules="nameRules"
                  color="green darken-2"
                  label="Vorname"
                  required
                ></v-text-field>
              </v-flex>

              <!-- Nachname -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="lastName"
                  :rules="nameRules"
                  color="blue darken-2"
                  label="Nachname"
                  required
                ></v-text-field>
              </v-flex>

              <!-- Nachname -->
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="nick"
                  :rules="[val => (val || '').length > 0 || 'Dieses Feld muss gefüllt sein']"
                  color="blue darken-2"
                  label="Nick"
                  required
                ></v-text-field>
              </v-flex>

              <!-- EMail -->
              <v-flex xs12>
                <v-text-field v-model="email" :rules="emailRules" color="teal">
                  <div slot="label">
                    E-Mail
                    <small>(optional)</small>
                  </div>
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
            <v-btn flat @click="resetForm">Abbrechen</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="!formIsValid" flat color="primary" type="submit">Registrieren</v-btn>
          </v-card-actions>
        </v-form>

        <!-- Nutzungsbedingungen -->
        <v-dialog v-model="terms" width="70%">
          <v-card>
            <v-card-title class="title">Terms</v-card-title>
            <v-card-text v-for="n in 5" :key="n">{{ content }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="green" @click="terms = false">Ok</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
  </toolbar-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToolbarLayout from '@/layout/ToolbarLayout.vue';

@Component({ components: { ToolbarLayout } })
export default class Register extends Vue {
    private firstName: string = '';
    private lastName: string = '';
    private nick: string = '';
    private email: string = '';
    private acceptTerms: boolean = false;
    private snackbar: boolean = false;
    private terms: boolean = false;

    private nameRules = [
        val => (val || '').length > 0 || 'Dieses Feld muss gefüllt sein',
        val => /[0-9]/.test(val) || 'Das Feld enthält ungültige Zeichen',
    ];

    private emailRules = [
        val =>
            (val || '').length == 0 ||
            /.+@.+/.test(val) ||
            'E-Mailadresse ist ungültig',
    ];

    private content: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.`;

    private resetForm() {
        this.$refs.form.reset();
    }

    private submit() {
        this.snackbar = true;
        this.resetForm();
    }

    get formIsValid() {
        return this.firstName && this.lastName && this.nick && this.acceptTerms;
    }
}
</script>
<style lang="scss">
</style>