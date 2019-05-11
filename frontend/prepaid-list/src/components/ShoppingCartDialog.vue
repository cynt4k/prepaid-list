<template>
  <v-dialog
    :value="value"
    origin="left"
    @input="$emit('input', false)"
    transition="slide-y-reverse-transition"
  >
    <v-card>
      <v-card-title>
        <v-icon style="font-size: 21px; margin-right: 10px">mdi-cart</v-icon>
        <h2>Warenkorb</h2>
        <v-btn icon flat style="margin-left: auto" @click="$emit('input', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <div>
        <shopping-cart/>
      </div>
    </v-card>
  </v-dialog>
</template>
	
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ShoppingCart from '@/components/ShoppingCart.vue';

@Component({
    components: { ShoppingCart },
})
export default class Register extends Vue {
	// name of binding should not be changed because of emitting on a v-model. This v-model automatically listen to a binding called "value".
	// For further information see https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components
    @Prop()
    private value: boolean = false;
}
</script>