<template>
  <v-app>
    <router-view
      @flash-success-snackbar="flashSuccessSnackbar"
      @flash-danger-snackbar="flashDangerSnackbar"
    />

    <v-snackbar
      v-model="success_snackbar"
      timeout="2000"
      :value="true"
      absolute
      color="success"
      bottom
      right
      >{{ success_snackbar_message }}</v-snackbar
    >
    <v-snackbar
      v-model="danger_snackbar"
      timeout="2000"
      :value="true"
      absolute
      color="red"
      bottom
      right
      >{{ danger_snackbar_message }}</v-snackbar
    >
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    success_snackbar: false,
    success_snackbar_message: null,
    danger_snackbar: false,
    danger_snackbar_message: null,
  }),

  methods: {
    flashSuccessSnackbar(message) {
      this.success_snackbar = true;
      this.success_snackbar_message = message;
    },

    flashDangerSnackbar(message) {
      this.danger_snackbar = true;
      this.danger_snackbar_message = message;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/main.scss";
</style>
