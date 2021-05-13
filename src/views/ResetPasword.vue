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
                  v-model="login"
                  label="Email"
                  outlined
                  rounded
                  :error-messages="validation_errors.login"
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
                  send reset link
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
import ApiService from "@/services/api.service";
export default {
  data() {
    return {
      loading: false,
      validation_errors: {
        login: null,
      },
      login: "joana52@example.com",
    };
  },
  methods: {
    submit() {
      this.loading =true;
      let email = this.login;
      let url = this.$app_url+"/api/auth/forget-password";
      ApiService.post(url,{'email': email})
        .then((res) => {
          this.login = null;
          this.$toast.success(res.data.message);
        })
        .catch((err) =>{
          this.validation_errors = err.response.data.errors;
          this.$toast.error(err.response.data.message)
        })
        .finally(()=> this.loading = false);
    },
  },
};
</script>
