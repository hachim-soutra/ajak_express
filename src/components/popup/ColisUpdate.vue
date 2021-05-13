<template>
  <v-dialog v-model="$parent.dialog_edit" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">modifier colis {{ item.name }}</span>
      </v-card-title>
      <v-card-text>
        <v-container class="w-80">
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="name*"
                :class="{ 'is-invalid': form.errors.has('name') }"
                v-model="form.name"
                required
              ></v-text-field>
              <has-error :form="form" field="name"></has-error>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Produit *"
                :class="{ 'is-invalid': form.errors.has('produit') }"
                v-model="form.produit"
                required
              ></v-text-field>
              <has-error :form="form" field="produit"></has-error>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="status_items"
                label="Status*"
                :class="{ 'is-invalid': form.errors.has('status') }"
                v-model="form.status"
                required
              ></v-select>
              <has-error :form="form" field="status"></has-error>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Telephone*"
                :class="{ 'is-invalid': form.errors.has('phone') }"
                v-model="form.phone"
                required
              ></v-text-field>
              <has-error :form="form" field="phone"></has-error>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Ville arrive *"
                :class="{ 'is-invalid': form.errors.has('ville_arrive') }"
                v-model="form.ville_arrive"
                required
              ></v-text-field>
              <has-error :form="form" field="ville_arrive"></has-error>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Montant *"
                :class="{ 'is-invalid': form.errors.has('montant') }"
                v-model="form.montant"
                required
              ></v-text-field>
              <has-error :form="form" field="montant"></has-error>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="livreurs"
                label="livreur *"
                :class="{ 'is-invalid': form.errors.has('livreur_id') }"
                v-model="form.livreur_id"
                item-value="id"
                item-text="name"
                required
              ></v-select>
              <has-error :form="form" field="livreur_id"></has-error>
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
            <v-col cols="12">
              <v-textarea
                name="input-7-1"
                label="Description"
                value=""
                v-model="form.description"
                hint="Description..."
              ></v-textarea>
              <has-error :form="form" field="description"></has-error>
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
  name: "ConfirmEdit",
  props: ["item"],
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      show: false,
      menu1: false,
      livreurs: null,
      date: new Date().toISOString().substr(0, 10),
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
        name: "111",
        phone: "",
        status: "",
        date_livraison: "",
        ville_arrive: "",
        produit: "",
        adresse: "",
        montant: "",
        livreur_id: "",
        description: "",
      }),
    };
  },
  watch: {
    item() {
      this.form.name = this.item.name;
      this.form.phone = this.item.phone;
      this.form.status = this.item.status;
      this.form.produit = this.item.produit;
      this.form.ville_arrive = this.item.ville_arrive;
      this.form.livreur_id = this.item.livreur_id;
      this.form.montant = this.item.montant;
      this.form.adresse = this.item.adresse;
      this.form.description = this.item.description;
    },
  },
  mounted() {
    ApiService.get(`${this.$app_url}/api/auth/livreur-list`)
      .then((res) => {
        this.livreurs = res.data.data;
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    save() {
      this.form
        .put(`${this.$app_url}/api/auth/colis/${this.item.id}`)
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.$parent.dialog_edit = false;
          this.$parent.fetchData(`${this.$app_url}/api/auth/colis`);
        })
        .catch((err) => console.log(err));
    },
    cancel() {
      this.$parent.dialog_edit = false;
    },
  },
};
</script>
