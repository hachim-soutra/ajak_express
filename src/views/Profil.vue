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
            :to="{ name: 'Dashboard' }"
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
            Mon profil
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

        <v-col
          lg="4"
          md="5"
          sm="6"
          cols="12"
          class="d-flex align-end justify-sm-end justify-start"
        >
          <v-row no-gutters>
            <v-col sm="6" cols="12" class="mt-2">
              <v-btn
                class="informations-btn"
                :class="{ 'black-btn': mes_informations_show }"
                @click="toggle_informations()"
                tile
                outlined
                depressed
                >Mes informations</v-btn
              >
            </v-col>

            <v-col sm="6" cols="12" class="mt-2 ">
              <v-btn
                class="historique-btn"
                :class="{ 'black-btn': mon_historique_show }"
                @click="toggle_historique()"
                tile
                outlined
                depressed
                >Mon historique</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row v-if="mes_informations_show" class="white py-4 pb-12">
        <v-col class="d-flex align-center justify-center" cols="12">
          <p
            class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
          >
            Mes informations
          </p>
        </v-col>

        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Mon role:
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ profile.role.name }}
            </p>
          </div>

          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Admins :
            </p>
            <p
              class="ma-0 text-subtitle-2 font-weight-regular"
              v-for="collaborator in profile.collaborators"
              :key="collaborator.id"
            >
              {{
                collaborator.name
                  ? `${collaborator.name} : ${collaborator.phone}`
                  : ""
              }}
            </p>
          </div>
        </v-col>

        <v-col md="4" sm="6" cols="12" style="border-right:1px solid #000;">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Téléphone
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ profile.phone }}
            </p>
          </div>

          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Adresse e-mail
            </p>
            <p class="ma-0 text-subtitle-2 font-weight-regular">
              {{ profile.email }}
            </p>
          </div>
        </v-col>

        <v-col md="4" sm="6" cols="12">
          <div class="mx-8 my-6">
            <p class="ma-0 text-subtitle-2 font-weight-bold black--text">
              Colis {{ profile.colis.length }}
            </p>
            <p
              class="ma-0 text-subtitle-2 font-weight-regular"
              v-for="collaborator in profile.colis"
              :key="collaborator.id"
            >
              {{
                collaborator.name
                  ? `${collaborator.name} => ${collaborator.token}`
                  : ""
              }}
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="mon_historique_show" class="white py-4 pb-12">
        <v-col class="d-flex align-center justify-center" cols="12">
          <p
            class="bottom-border text-subtitle-1 font-weight-bold text-uppercase"
          >
            Mon historique
          </p>
        </v-col>

        <v-col>
          <v-data-table
            :headers="orders_headers"
            :items="orders_data"
       
            :loading="loading"
            loading-text="Loading... Please wait"
            class="elevation-1"
          >
            <template v-slot:item="row">
              <tr :class="{ bg_row_active: show_row == row.item.id }">
                <td>{{ row.item.order_type }}</td>
                <td>{{ row.item.created_at | change_date_format() }}</td>
                <td>{{ row.item.tools_count }}</td>
                <td>{{ row.item.tools_quantity }}</td>
                <td>{{ row.item.tools_price + " €" }}</td>
                <td>{{ row.item.status | translate_ststus() }}</td>
                <td>{{ row.item.invoice_no }}</td>
                <td>
                  <v-btn
                    icon
                    small
                    color="black"
                    @click="onButtonClick(row.item)"
                  >
                    <v-icon dark>mdi-eye</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>

          <v-col>
            <template>
              <div class="text-right">
                <v-pagination
                  v-if="orders_last_page !== 1"
                  color="grey"
                  v-model="orders_current_page"
                  :length="orders_last_page"
                  @input="go_to_orders_page"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                ></v-pagination>
              </div>
            </template>
          </v-col>
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
    truncate(text, stop, clamp) {
      return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
    },

    translate_ststus(status) {
      let statusFR = "";
      if (status === "DISPATCHED") {
        statusFR = "Livré";
      } else if (status === "IN_PROGRESS") {
        statusFR = "En cours";
      } else if (status === "PLACED") {
        statusFR = "Placé";
      } else {
        statusFR = "Annulé";
      }
      return statusFR;
    },
  },
  mounted() {
    this.fetchProfil();
    // this.fetchOrders(`${this.$app_url}/api/v1/agency/order`);
  },

  computed: {
    get_profile() {
      if (localStorage.getItem("set_profile")) {
        return localStorage.getItem("set_profile");
      } else {
        return null;
      }
    },
  },

  data() {
    return {
      mes_informations_show: true,
      mon_historique_show: false,
      facture_modal_show: false,

      orders_current_page: 1,
      orders_last_page: 1,
      loading: false,

      profile: {
        address: null,
        collaborators: [],
        email: null,
        manager: null,
        mobile_phone: null,
        opening_time: null,
        phone: null,
        rc: null,
        rib: null,
        siret: null,
        tva: null,
      },

      orders_headers: [
        { text: "Commandes", value: "commandes", class: "black--text" },
        { text: "Date", value: "date", class: "black--text" },
        { text: "Outils", value: "outils", class: "black--text" },
        { text: "Quantité", value: "quantite", class: "black--text" },
        { text: "Prix", value: "prix", class: "black--text" },
        { text: "Statut", value: "statut", class: "black--text" },
        { text: "Factures", value: "factures", class: "black--text" },
        { text: "Afficher", class: "black--text" },
      ],

      orders_data: [],
      show_row: null,
    };
  },

  components: {
    Footer,
    Navbar,
  },

  methods: {
    showRows(row) {
      if (row.tools.length > 1) {
        if (this.show_row == row.id) {
          this.show_row = null;
        } else {
          this.show_row = row.id;
        }
      }
    },
    fetchProfil() {
      ApiService.get(`${this.$app_url}/api/auth/getProfil`)
        .then((res) => {
          this.profile = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    fetchOrders(url) {
      ApiService.get(url)
        .then((res) => {
          this.orders_current_page = res.data.current_page;
          this.orders_last_page = res.data.last_page;
          this.orders_data = res.data.data;
        })
        .catch((err) => console.log(err));
    },

    go_to_orders_page(page) {
      this.fetchOrders(`${this.$app_url}/api/v1/agency/order?page=${page}`);
    },

    onButtonClick(file) {
      this.$router.push({
        name: "HistoriqueDetails",
        params: {
          order: file,
        },
      });
    },

    toggle_informations() {
      this.mes_informations_show = true;
      this.mon_historique_show = false;
    },

    toggle_historique() {
      this.mes_informations_show = false;
      this.mon_historique_show = true;
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
