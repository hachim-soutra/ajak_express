<template>
  <v-dialog v-model="$parent.dialog_add" persistent max-width="600px">
    <v-card>
      <v-card-title>
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
              <v-select
                :items="roles"
                label="role *"
                :class="{ 'is-invalid': form.errors.has('role_id') }"
                v-model="form.role_id"
                item-value="id"
                item-text="name"
                required
              ></v-select>
              <has-error :form="form" field="role_id"></has-error>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                :class="{ 'is-invalid': form.errors.has('password') }"
                v-model="form.password"
                required
                append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
              <has-error :form="form" field="password"></has-error>
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
import ApiService from "@/services/api.service";
import { Form } from "vform";
export default {
  name: "UserAdd",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      show: false,
      roles: null,
      // Create a new form instance
      form: new Form({
        name: "",
        email: "",
        phone: "",
        password: "",
        role_id: "",
      }),
    };
  },
  mounted() {
    ApiService.get(`${this.$app_url}/api/auth/role-list`)
      .then((res) => {
        this.roles = res.data.data;
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    save() {
      this.form
        .post(`${this.$app_url}/api/auth/equipe`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.$parent.dialog_add = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/equipe`);
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_add = false;
    },
  },
};
</script>
