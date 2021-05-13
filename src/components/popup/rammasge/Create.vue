<template>
  <v-dialog v-model="$parent.dialog_add" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">ajouter nouveau rammasge</span>
      </v-card-title>
      <v-card-text>
        <v-container class="w-80">
          <v-row>
            <v-col cols="12">
              <v-select
                :items="colis"
                label="Colis *"
                :class="{ 'is-invalid': form.errors.has('colis_id') }"
                v-model="form.colis_id"
                item-value="id"
                item-text="name"
                required
              ></v-select>
              <has-error :form="form" field="colis_id"></has-error>
            </v-col>

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
// import { clientsMixin } from "@/mixins/clientsMixin.js";
import ApiService from "@/services/api.service";

export default {
  name: "ConfirmAdd",
  // mixins: [clientsMixin],
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      menu2: false,
      show: false,
      colis: null,

      // Create a new form instance
      form: new Form({
        quantity: "",
        price: "",
        colis_id: "",
      }),
    };
  },
  mounted() {
    ApiService.get(`${this.$app_url}/api/auth/colis-list`)
      .then((res) => {
        this.colis = res.data.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    save() {
      this.form
        .post(`${this.$app_url}/api/auth/rammasge`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.$parent.dialog_add = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/rammasge`);
          this.form.reset();
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_add = false;
    },
  },
};
</script>
