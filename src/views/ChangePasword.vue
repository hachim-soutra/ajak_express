<template>
  <div class="login-container">
    <div class="logo"></div>
    <v-row no-gutters class="black">
      <v-col lg="6" cols="12" class="login-img"></v-col>
      <v-col
        lg="6"
        cols="12"
        class="form-container d-flex justify-center align-center"
      >
        <v-container class="text-center">
          <p class="font-weight-light ma-0 text-bienvenue">
            Bienvenue sur agence
          </p>
          <p class="text-noblessa font-weight-thin">
            ajak <strong class="font-weight-light">Express</strong>
          </p>
          <v-row no-gutters>
            <v-col lg="2" cols="12"></v-col>

            <v-col lg="8" cols="12">
              <form @submit.prevent="submit">
                <v-text-field
                  v-model="form.password"
                  label="password"
                  outlined
                  type="password"
                  rounded
                  :rules="[rules.required, rules.min]"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.password_confirmation"
                  label="password_confirmation"
                  outlined
                  :rules="[rules.required, rules.emailMatch]"
                  type="password"
                  rounded
                  required
                ></v-text-field>
                <v-btn
                  medium
                  outlined
                  text
                  tile
                  :loading="loading"
                  class="my-4 font-weight-light submit-btn"
                  color="white"
                  @click="submit"
                >
                  send
                </v-btn>

                <v-btn
                  plain
                  class="my-4 font-weight-light reset-password-btn"
                  :to="{name:'Login'}"
                  >login page</v-btn
                >
              </form>
            </v-col>

            <v-col lg="2" cols="12"></v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Form } from 'vform'
export default {
  data() {
    return {
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The password you entered don't match`),
        },
      form: new Form({
        password: "joana52@example.com",
        password_confirmation: "joana52@example.com",
        token: this.$route.params.token
      }),
    };
  },


  methods: {
    submit() {
      this.loading = true;
      let url = this.$app_url+"/api/auth/reset-password";
      this.form.post(url,this.form).then((res) => {
          this.form.clear();
          this.$toast.success(res.data.message);
        })
        .catch((err) =>this.$toast.error(err.response.data.message))
        .finally(()=> this.loading = false);
    },
  },
};
</script>
