<template>
  <v-dialog v-model="$parent.dialog_edit" persistent max-width="600px">
    <v-card>
      <v-card-title color="indigo" dark>
        <span class="headline">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container class="w-80">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Legal first name*"
                :class="{ 'is-invalid': form.errors.has('name') }"
                v-model="form.name"
                required
              ></v-text-field>
              <has-error :form="form" field="name"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                :class="{ 'is-invalid': form.errors.has('email') }"
                v-model="form.email"
                required
              ></v-text-field>
              <has-error :form="form" field="email"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Phone*"
                :class="{ 'is-invalid': form.errors.has('phone') }"
                v-model="form.phone"
                required
              ></v-text-field>
              <has-error :form="form" field="phone"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Prix livraison (Dhs) *"
                :class="{ 'is-invalid': form.errors.has('prix') }"
                v-model="form.prix"
                required
              ></v-text-field>
              <has-error :form="form" field="prix"></has-error>
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
      // Create a new form instance
      form: new Form({
        name: "",
        email: "",
        phone: "",
      }),
    };
  },
  watch: {
    item() {
      this.form.name = this.item.name;
      this.form.email = this.item.email;
      this.form.phone = this.item.phone;
    },
  },
  methods: {
    save() {
      this.form
        .put(`${this.$app_url}/api/auth/livreur/${this.item.id}`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.message);
          this.$parent.dialog = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/livreur`);
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_edit = false;
    },
  },
};
</script>
