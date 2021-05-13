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
                  label="Login"
                  outlined
                  rounded
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  type="password"
                  outlined
                  rounded
                  border
                  label="Mot de passe"
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
                  c'est parti !
                </v-btn>

                <v-btn
                  plain
                  class="my-4 font-weight-light reset-password-btn"
                  to="/reset-pasword"
                  >login ou mot de passe publié</v-btn
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
export default {
  data() {
    return {
      login: "joana52@example.com",
      password: "password",
      loading: false,
    };
  },

  computed: {},

  methods: {
    submit() {
      let email = this.login;
      this.loading = true;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then((res) => {
          this.login = null;
          this.$toast.success(res.data.message);
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err) => this.$toast.error(err.response.data.message))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
