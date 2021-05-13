<template>
  <div class="page-wrapper grey lighten-4">
    <Navbar />
    <v-container class="w-80">
      <v-row class="py-4">
        <v-col
          lg="4"
          md="3"
          sm="3"
          cols="12"
          class="d-flex flex-column align-start justify-center"
        >
          <v-btn
            :to="{ name: 'Colis' }"
            tile
            depressed
            class="subtitle-2 text-lowercase pl-0"
          >
            <v-icon class="font-weight-regular pr-2" color="black"
              >mdi-arrow-left</v-icon
            >
            Retour
          </v-btn>
          <p class="text-h6 ma-0 pl-3" style="border-left:4px solid #000;">
            Colis detail
          </p>
        </v-col>
        <v-col
          lg="4"
          md="4"
          sm="3"
          cols="12"
          class="d-flex align-end justify-md-center justify-sm-start justify-center"
        >
          <p class="text-h6 ma-0"></p>
        </v-col>
      </v-row>

      <v-row class="white py-4 pb-12">
        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <v-col class="d-flex align-center justify-center" cols="12">
            <p
              class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
            >
              agence
            </p>
          </v-col>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Name :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.agence.name }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Ville :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.agence.city }}
            </p>
          </div>

          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Adresse :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.agence.adresse }}
            </p>
          </div>
        </v-col>
        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <v-col class="d-flex align-center justify-center" cols="12">
            <p
              class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
            >
              client
            </p>
          </v-col>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Name :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.client.name }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Téléphone
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.client.phone }}
            </p>
          </div>

          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Adresse e-mail
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.client.email }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Date
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.client.created_at }}
            </p>
          </div>
        </v-col>
        <v-col md="4" sm="6" cols="12">
          <v-col class="d-flex align-center justify-center" cols="12">
            <p
              class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
            >
              colis
            </p>
          </v-col>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Colis
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.status }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Ville arrive
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.ville_arrive }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              produit
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.produit }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              client phone
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.phone }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import ApiService from "@/services/api.service";
import moment from "moment";

export default {
  filters: {
    change_date_format(date) {
      const result = moment(date)
        .locale("fr")
        .format("DD/MM/YYYY");
      return result;
    },
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      item: null,
      loading: false,
    };
  },
  components: {
    Footer,
    Navbar,
  },
  methods: {
    fetchData() {
      ApiService.get(`${this.$app_url}/api/auth/colis/${this.$route.params.id}`)
        .then((res) => {
          this.item = res.data.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.v-dialog {
  .facture-modal {
    img {
      width: 100%;
      height: auto;
    }

    .modal-title {
      &:after {
        content: none;
      }

      font-size: 16px;
      text-transform: initial;
      line-height: 1em;
      font-weight: 500;
    }

    .close-modal {
      position: relative;
      left: 0;
      top: 0;
      color: #000 !important;
    }
  }
}

.informations-btn,
.historique-btn {
  width: 100%;
}
.rotate {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.display_hidden {
  opacity: 0;
}
.bg_row_active {
  background-color: #f5f5f5 !important;
}
.pointer_cursor {
  cursor: pointer;
}
</style>
