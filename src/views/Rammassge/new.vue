<template>
  <div class="page-wrapper grey lighten-4">
    <Navbar />

    <v-container class="w-80">
      <v-row class="py-4">
        <v-col
          sm="8"
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
            Mes campagnes commerciales
          </p>
        </v-col>

        <v-col sm="4" cols="12" class="d-flex align-end actions-btn-container">
          <v-btn
            class="black-btn panorama-btn"
            :class="{ 'active-btn': panorama_modal_show }"
            tile
            outlined
            depressed
            @click="showPanoramaModal()"
            >Panorama media</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="white py-4 pb-12">
        <v-col>
          <v-data-table
            class="campagnes-table elevation-1"
            :headers="headers"
            :items="data"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.claim }}</td>
                <td>Du {{ row.item.start_date }} au {{ row.item.end_date }}</td>
                <td>
                  <v-btn
                    icon
                    small
                    color="black"
                    @click="onShowClick(row.item)"
                  >
                    <v-icon dark>mdi-eye</v-icon>
                  </v-btn>
                </td>
                <td
                  class="font-weight-bold"
                  @click="showOutilsModal(row.item.id)"
                >
                  {{ row.item.tools_count }}
                </td>
              </tr>
            </template>
          </v-data-table>

          <v-dialog v-model="campagne_modal_show" width="700">
            <v-card class="campagne-modal">
              <v-card-title class="modal-title">
                <v-container class="pa-0">
                  <v-row no-gutters>
                    <v-col cols="1" class="d-flex align-center justify-start">
                      <v-btn
                        icon
                        class="close-modal"
                        @click="campagne_modal_show = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col
                      sm="5"
                      cols="12"
                      class="d-flex align-center justify-sm-start justify-center"
                    >
                      {{ campagne_modal_info.name }}
                    </v-col>

                    <v-col
                      sm="1"
                      cols="12"
                      class="d-flex align-center justify-center"
                    >
                      <v-icon color="black">
                        mdi-download
                      </v-icon>
                    </v-col>
                    <v-col
                      sm="5"
                      cols="12"
                      class="d-flex align-center justify-sm-end justify-center"
                    >
                      {{ campagne_modal_info.date }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>

              <v-card-text>
                <v-container class="ma-0 pa-0">
                  <img :src="campagne_modal_info.file" alt="" />
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="outils_modal_show" width="1200">
            <v-card class="campagne-outils-modal">
              <v-card-title class="modal-title ">
                <v-container class="pa-0">
                  <v-row no-gutters>
                    <v-col cols="1" class="d-flex align-center justify-start">
                      <v-btn
                        icon
                        class="close-modal"
                        @click="outils_modal_show = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col
                      md="3"
                      sm="5"
                      cols="12"
                      class="d-flex py-2 align-center justify-md-start justify-center"
                    >
                      Les beaux Soldes d'hiver
                    </v-col>

                    <v-col
                      md="3"
                      sm="6"
                      cols="12"
                      class="d-flex py-2 align-center justify-md-start justify-center"
                    >
                      25 juin au 25 juillet 2021
                    </v-col>

                    <v-col
                      md="5"
                      sm="12"
                      cols="12"
                      class="d-flex py-2 align-center justify-md-end justify-center"
                    >
                      <v-btn class="black-btn" tile outlined depressed>
                        <v-icon class="mr-2" style="font-size:16px;">
                          mdi-help-circle
                        </v-icon>
                        Commandes ou demandes speciales
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>

              <v-card-text class="grey lighten-2 py-0">
                <v-container class="w-80">
                  <v-row>
                    <v-col md="6" cols="12"> </v-col>

                    <v-col md="6" cols="12">
                      <p
                        class="d-flex justify-center align-center font-weight-bold black--text text-subtitle-1"
                      >
                        Production - Impression
                      </p>
                    </v-col>
                  </v-row>

                  <v-row class="white">
                    <v-col cols="12">
                      <v-simple-table
                        dense
                        fixed-header
                        height="500px"
                        class="outils-table"
                      >
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th>Outils</th>
                              <th>Lire</th>
                              <th>Telecharger</th>
                              <th>Commander</th>
                              <th>Quantite</th>
                              <th>Prix</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr v-for="outil in outils_table" :key="outil.id">
                              <td class="font-weight-medium">
                                {{ outil.outil }}
                              </td>
                              <td>
                                <v-btn icon small color="black">
                                  <v-icon dark>mdi-eye</v-icon>
                                </v-btn>
                              </td>
                              <td>
                                <v-btn icon small color="black">
                                  <v-icon dark>mdi-download</v-icon>
                                </v-btn>
                              </td>
                              <td>
                                <v-btn icon small color="black">
                                  <v-checkbox color="black"></v-checkbox>
                                </v-btn>
                              </td>
                              <td>
                                <v-select
                                  dense
                                  class="mx-auto pa-0"
                                  style="width:100px;"
                                  height="25"
                                  color="black"
                                  :items="quantity_select"
                                ></v-select>
                              </td>
                              <td class="font-weight-medium">
                                {{ outil.prix }} €
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>

                    <v-col
                      lg="3"
                      md="4"
                      sm="6"
                      cols="12"
                      class="d-flex flex-row justify-center align-center font-weight-medium black--text"
                    >
                      <div class="mr-2 circle circle-black"></div>
                      Outils generiaue campagne
                    </v-col>

                    <v-col
                      lg="3"
                      md="4"
                      sm="6"
                      cols="12"
                      class="d-flex flex-row justify-center align-center font-weight-medium black--text"
                    >
                      <div class="mr-2 circle circle-gold"></div>
                      Outils personnalise point de vente
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions class="grey lighten-2">
                <v-container class="w-80">
                  <v-row>
                    <v-col cols="12" class="d-flex justify-center align-center">
                      <v-btn class="black-btn" tile outlined depressed>
                        Confirmer
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="panorama_modal_show" width="1000">
            <v-card class="panorama-modal">
              <v-card-title class="modal-title ">
                <v-container class="pa-0">
                  <v-row no-gutters>
                    <v-col cols="1" class="d-flex align-center justify-start">
                      <v-btn
                        icon
                        class="close-modal"
                        @click="panorama_modal_show = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col
                      sm="4"
                      cols="12"
                      class="d-flex align-center justify-sm-start justify-center"
                    >
                      Panorama média
                    </v-col>

                    <v-col
                      sm="3"
                      cols="12"
                      class="d-flex align-center font-weight-bold justify-sm-start justify-center"
                    >
                      Noblessa Toulon
                    </v-col>

                    <v-col
                      sm="4"
                      cols="12"
                      class="d-flex align-center justify-sm-end justify-center"
                    >
                      1/9
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>

              <v-card-text>
                <v-container
                  class="ma-0 pa-0 justify-center align-center d-flex"
                >
                  <img src="~@/assets/img/panorama.png" alt="" />
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-container class="w-80">
                  <v-row>
                    <v-col
                      sm="6"
                      cols="12"
                      class="d-flex justify-sm-start justify-center align-center"
                    >
                      Affichage_urbain_radio_presse
                    </v-col>

                    <v-col
                      sm="6"
                      cols="12"
                      class="d-flex justify-sm-end justify-center align-center"
                    >
                      Mise à jour : 02/02/2021
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-dialog>
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

export default {
  mounted() {
    this.fetchData(`${this.$app_url}/api/v1/agency/commercial_campaign`);
  },

  data() {
    return {
      campagne_modal_show: false,
      outils_modal_show: false,
      panorama_modal_show: false,

      current_page: 1,
      last_page: 1,
      loading: false,

      headers: [
        { text: "Campagne", value: "name", class: "black--text" },
        { text: "Claim", value: "claim", class: "black--text" },
        { text: "Date", value: "date", class: "black--text" },
        { text: "Afficher", class: "black--text" },
        { text: "Outils", value: "tools_count", class: "black--text" },
      ],

      data: [],

      campagne_modal_info: {
        name: null,
        date: null,
        file: null,
      },

      outils_table: [
        {
          id: 1,
          outil: "Banderole",
          prix: 0,
        },
        {
          id: 2,
          outil: "Vitrophanie",
          prix: 0,
        },
        {
          id: 3,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 4,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 5,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 6,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 7,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 8,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 9,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 10,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 11,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 12,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 13,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 14,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 15,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 16,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 17,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 18,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 19,
          outil: "Affiche 4x3",
          prix: 0,
        },
        {
          id: 20,
          outil: "Affiche 4x3",
          prix: 0,
        },
      ],

      quantity_select: [10, 50, 100, 200, 500, 1000],
    };
  },

  components: {
    Footer,
    Navbar,
  },

  computed: {},

  methods: {
    fetchData(url) {
      this.loading = true;
      ApiService.get(url)
        .then((res) => {
          console.log(res);
          this.current_page = res.data.current_page;
          this.last_page = res.data.last_page;
          this.data = res.data.data;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },

    go_to_page(page) {
      this.fetchData(
        `${this.$app_url}/api/v1/agency/commercial_campaign?page=${page}`
      );
    },

    onShowClick(item) {
      console.log(item);

      ApiService.get(`${this.$app_url}/api/v1/user/file/${item.file_id}`)
        .then((res) => {
          this.campagne_modal_info.name = item.name;
          this.campagne_modal_info.date = `${item.start_date} au ${item.end_date}`;
          this.campagne_modal_info.file = res.data;

          console.log(res);

          this.campagne_modal_show = true;
        })
        .catch((err) => console.log(err));
    },

    showOutilsModal(id) {
      ApiService.get(
        `${this.$app_url}/api/v1/agency/commercial_campaign/${id}/tool`
      )
        .then((res) => {
          console.log(res);

          this.outils_modal_show = true;
        })
        .catch((err) => console.log(err));
    },

    showPanoramaModal() {
      ApiService.get(
        `${this.$app_url}/api/v1/agency/commercial_campaign/file/panorama`
      )
        .then((res) => {
          console.log(res);

          this.panorama_modal_show = true;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.v-dialog {
  .campagne-modal,
  .panorama-modal {
    img {
      width: 100%;
      height: auto;
    }
  }

  .campagne-modal,
  .campagne-outils-modal {
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

    .outils-table {
      border-radius: 0 !important;

      thead tr {
        th {
          padding: 12px;
          text-align: center !important;
          color: #000 !important;
          border-bottom: 2px solid #000 !important;

          &:nth-child(3) {
            border-right: 2px solid #000 !important;
          }
        }
      }

      tbody tr {
        td {
          text-align: center !important;
          border: none !important;

          &:nth-child(3) {
            border-right: 2px solid #000 !important;
          }
        }
      }
    }

    .circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.circle-black {
        background-color: #000;
      }

      &.circle-gold {
        background-color: #a37f43;
      }
    }
  }
}

.campagnes-table {
  border-radius: 0 !important;

  thead tr {
    th {
      color: #000 !important;
      border-bottom: 1px solid #000 !important;
    }
  }

  tbody tr {
    &:hover,
    &:hover td .v-btn--icon {
      background: #000 !important;
      color: #fff !important;
    }

    td {
      border: none !important;
    }

    td .v-btn--icon .v-icon {
      font-size: 18px;

      &:hover {
        font-size: 24px;
      }
    }
  }
}

.panorama-btn {
  width: 100%;
}

.actions-btn-container {
  justify-content: flex-start;
}

@media only screen and (min-width: 600px) {
  .panorama-btn {
    width: auto;
  }

  .actions-btn-container {
    justify-content: flex-end;
  }
}
</style>
