<template>
  <v-dialog v-model="$parent.dialog_edit" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline"
          >modifier rammasge colis<br />
          {{ item.colis.name }}</span
        >
      </v-card-title>
      <v-card-text>
        <v-container class="w-80">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Quantity*"
                :class="{ 'is-invalid': form.errors.has('quantity') }"
                v-model="form.quantity"
                required
              ></v-text-field>
              <has-error :form="form" field="quantity"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Price*"
                :class="{ 'is-invalid': form.errors.has('price') }"
                v-model="form.price"
                required
              ></v-text-field>
              <has-error :form="form" field="price"></has-error>
            </v-col>
            <v-col cols="12">
              <v-select
                :items="status_items"
                label="Status*"
                :class="{ 'is-invalid': form.errors.has('status') }"
                v-model="form.status"
                required
              ></v-select>
              <has-error :form="form" field="status"></has-error>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="cancel">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Form } from "vform";
export default {
  name: "ConfirmEdit",
  props: ["item"],
  data() {
    return {
      status_items: [
        "en attente",
        "ramasser",
        "expédié",
        "pas de reponse",
        "reporter",
        "annuler",
        "livré",
        "return",
      ],
      // Create a new form instance
      form: new Form({
        quantity: "",
        price: "",
        status: "",
      }),
    };
  },
  watch: {
    item() {
      this.form.quantity = this.item.quantity;
      this.form.price = this.item.price;
      this.form.status = this.item.colis.status;
    },
  },

  methods: {
    save() {
      this.form
        .put(`${this.$app_url}/api/auth/rammasge/${this.item.id}`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.$parent.dialog_edit = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/rammasge`);
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_edit = false;
    },
  },
};
</script>
