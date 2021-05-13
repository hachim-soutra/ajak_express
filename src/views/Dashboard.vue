<template>
  <div class="page-wrapper">
    <Navbar />

    <v-container class="w-80">
      <v-row>
        <v-col class="menu-container" lg="4" md="6" cols="12">
          <v-btn
            :to="{ name: 'Colis' }"
            tile
            plain
            class="menu-btn menu-campagnes"
          >
            <p class="menu-item-text">Mes colis</p>

            <p class="d-none menu-item-details">
              Suivi des colis et des livraisons
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="menu-container" lg="4" md="6" cols="12">
          <v-btn
            :to="{ name: 'ColisRetour' }"
            tile
            plain
            class="menu-btn menu-point-vente"
          >
            <p class="menu-item-text">Retour</p>

            <p class="d-none menu-item-details">
              Catalogues, signalétique, PLV, ILV, édition, <br />
              goodies pour votre communication instore.
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="menu-container" lg="4" md="6" cols="12">
          <v-btn
            :to="{ name: 'Stock' }"
            tile
            plain
            class="menu-btn menu-activation"
          >
            <p class="menu-item-text">Stock</p>

            <p class="d-none menu-item-details">
              Créer, calibrer, cibler et diffuser vos messages, <br />
              mails et SMS sur votre zone de chalandise.
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="menu-container" lg="3" md="6" cols="12">
          <v-btn
            :to="{ name: 'Rammassge' }"
            tile
            plain
            class="menu-btn menu-reseaux-sociaux"
          >
            <p class="menu-item-text">Rammassge</p>

            <p class="d-none menu-item-details">
              Stratégie éditoriale, posts et animation <br />
              au mois le mois sur les réseaux.
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="menu-container" lg="3" md="6" cols="12">
          <v-btn
            :to="{ name: 'Livreur' }"
            tile
            plain
            class="menu-btn menu-corporate-beau-vivre"
          >
            <p class="menu-item-text">Livreur</p>

            <p class="d-none menu-item-details">
              Tous vos outils et conseils <br />
              pour communiquer Le Beau Vivre
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>
        <v-col class="menu-container" lg="3" md="6" cols="12">
          <v-btn
            :to="{ name: 'Client' }"
            tile
            plain
            class="menu-btn menu-corporate-beau-vivre"
          >
            <p class="menu-item-text">Clients</p>

            <p class="d-none menu-item-details">
              Tous vos outils et conseils <br />
              pour communiquer Le Beau Vivre
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="menu-container" lg="3" md="6" cols="12">
          <v-btn
            :to="{ name: 'Equipe' }"
            tile
            plain
            class="menu-btn menu-produits"
          >
            <p class="menu-item-text">Equipe</p>

            <p class="d-none menu-item-details">
              Toutes vos gammes : <br />
              cuisines, aménagements, <br />
              éléctro...
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>
        <v-col class="menu-container" lg="3" md="6" cols="12">
          <v-btn
            :to="{ name: 'Agence' }"
            tile
            plain
            class="menu-btn menu-produits"
          >
            <p class="menu-item-text">Agence</p>

            <p class="d-none menu-item-details">
              Toutes vos gammes : <br />
              cuisines, aménagements, <br />
              éléctro...
            </p>

            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      email_modal: false,
      phone_modal: false,
      cgv_modal: false,
    };
  },

  components: {
    Footer,
    Navbar,
  },

  computed: {},

  methods: {},
};
</script>

<style lang="scss">
@import "~@/assets/styles/navigation.scss";
</style>
