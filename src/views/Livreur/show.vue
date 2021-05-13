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
            :to="{ name: 'Livreur' }"
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
            Livreur detail
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
        <v-col class="d-flex align-center justify-center" cols="12">
          <p
            class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
          >
            {{ item.name }} informations
          </p>
        </v-col>

        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Total :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.total }}
            </p>
          </div>

          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Total net :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.totalNet }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Solde :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.payed }}
            </p>
          </div>
        </v-col>
        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              status
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.status }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Téléphone
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.phone }}
            </p>
          </div>

         <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Ville :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.city }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Date creation
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.created_at }}
            </p>
          </div>
        </v-col>
        <v-col md="4" sm="6" cols="12">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Colis total :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.colis.length }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Colis livre :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.colis_livre }}
            </p>
          </div>
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Colis return :
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ item.colis_return }}
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
      ApiService.get(`${this.$app_url}/api/auth/livreur/${this.$route.params.id}`)
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
