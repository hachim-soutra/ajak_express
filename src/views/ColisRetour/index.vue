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
            Colis retour
          </p>
        </v-col>

        <v-col sm="4" cols="12" class="d-flex align-end actions-btn-container">
          <v-btn class="black-btn " tile outlined depressed @click="addUser()"
            >ajouter nouveau colis</v-btn
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
                <td>{{ row.item.client.name }}</td>
                <td>{{ row.item.livreur ? row.item.livreur.name : "" }}</td>
                <td>{{ row.item.phone }}</td>
                <td>{{ row.item.created_at }}</td>
                <td>{{ row.item.produit }}</td>
                <td>{{ row.item.ville_depart }}</td>
                <td>{{ row.item.ville_arrive }}</td>
                <td>{{ row.item.status }}</td>
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
                <td>
                  <v-btn icon small color="black" @click="editUser(row.item)">
                    <v-icon dark>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon small color="black" @click="deleteUser(row.item)">
                    <v-icon dark>mdi-trash-can</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <ColisDelete :item="selectedColis" />
    <ColisUpdate :item="selectedColis" />
    <ColisCreate :item="selectedColis" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import ColisDelete from "@/components/popup/ColisDelete.vue";
import ColisUpdate from "@/components/popup/ColisUpdate.vue";
import ColisCreate from "@/components/popup/ColisCreate.vue";
import ApiService from "@/services/api.service";

export default {
  mounted() {
    this.fetchData(`${this.$app_url}/api/auth/return-colis`);
  },

  data() {
    return {
      current_page: 1,
      last_page: 1,
      loading: false,
      headers: [
        { text: "Name", value: "name", class: "black--text" },
        { text: "Client", value: "name", class: "black--text" },
        { text: "Livreur", value: "name", class: "black--text" },
        { text: "Telephone", value: "claim", class: "black--text" },
        { text: "Date return", value: "name", class: "black--text" },
        { text: "Produit", value: "name", class: "black--text" },
        { text: "Ville Depart", value: "date", class: "black--text" },
        { text: "Ville arrive", value: "date", class: "black--text" },
        { text: "Status", value: "date", class: "black--text" },
        { text: "Afficher", class: "black--text" },
        { text: "Outils", value: "tools_count", class: "black--text" },
      ],

      data: [],
      dialog: false,
      dialog_edit: false,
      dialog_add: false,
      selectedColis: null,
    };
  },

  components: {
    Footer,
    Navbar,
    ColisDelete,
    ColisCreate,
    ColisUpdate,
  },

  computed: {},

  methods: {
    deleteUser(item) {
      this.selectedColis = item;
      this.dialog = true;
    },
    addUser() {
      this.dialog_add = true;
    },
    editUser(item) {
      this.selectedColis = item;
      this.dialog_edit = true;
    },
    fetchData(url) {
      this.loading = true;
      ApiService.get(url)
        .then((res) => {
          this.current_page = res.data.data.current_page;
          this.last_page = res.data.data.last_page;
          this.data = res.data.data.data;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
    onShowClick(item) {
      console.log(item);
      this.$router.push({ name: "ColisRetour.show", params: { id: item.id } });
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
