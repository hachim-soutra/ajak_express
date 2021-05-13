<template>
  <v-dialog v-model="$parent.dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">
        Confirm
      </v-card-title>
      <v-card-text>Are you sure you want to delete this record?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$parent.dialog = false">
          Disagree
        </v-btn>
        <v-btn color="green darken-1" text @click="agree">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ApiService from "@/services/api.service";

export default {
  name: "ConfirmDlg",
  props: ["item"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    agree() {
      ApiService.delete(`${this.$app_url}/api/auth/Agence/${this.item.id}`)
        .then(() => {
          this.$parent.dialog = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/Agence`);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
