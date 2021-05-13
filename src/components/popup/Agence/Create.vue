<template>
  <v-dialog v-model="$parent.dialog_add" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Agence Profile</span>
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
                label="Ville *"
                :class="{ 'is-invalid': form.errors.has('city') }"
                v-model="form.city"
                required
              ></v-text-field>
              <has-error :form="form" field="city"></has-error>
            </v-col>
                    <v-col cols="12">
              <v-text-field
                label="Telephone *"
                :class="{ 'is-invalid': form.errors.has('phone') }"
                v-model="form.phone"
                required
              ></v-text-field>
              <has-error :form="form" field="phone"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email *"
                :class="{ 'is-invalid': form.errors.has('email') }"
                v-model="form.email"
                required
              ></v-text-field>
              <has-error :form="form" field="email"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Adresse *"
                :class="{ 'is-invalid': form.errors.has('adresse') }"
                v-model="form.adresse"
                required
              ></v-text-field>
              <has-error :form="form" field="adresse"></has-error>
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
  name: "UserAdd",
  data() {
    return {
      show: false,
      roles: null,
      // Create a new form instance
      form: new Form({
        name: "",
        city: "",
        phone: "",
        adresse: "",
        email: "",
      }),
    };
  },
  methods: {
    save() {
      this.form
        .post(`${this.$app_url}/api/auth/Agence`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.form.name = null;
          this.form.city = null;
          this.$parent.dialog_add = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/Agence`);
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_add = false;
    },
  },
};
</script>
