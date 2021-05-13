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
            rammasge retour
          </p>
        </v-col>
        <v-col
          sm="4"
          cols="4"
          class="d-flex align-end actions-btn-container flex-column"
        >
          <v-btn
            class="black-btn w-100"
            tile
            outlined
            depressed
            @click="addUser()"
            >ajouter nouveau rammasge</v-btn
          >
          <v-btn
            class="black-btn w-100 mt-2"
            tile
            outlined
            depressed
            @click="Toggle()"
            >{{ toggleText }}</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="white py-4 pb-12" v-if="toggleAfficher">
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
                <td>{{ row.item.colis.name }}</td>
                <td>{{ row.item.user ? row.item.user.name : "" }}</td>
                <td>{{ row.item.quantity }}</td>
                <td>{{ row.item.price }}</td>
                <td>{{ row.item.created_at }}</td>

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
      <v-row class="white py-4 pb-12" v-else>
        <v-col>
          <v-data-table
            class="campagnes-table elevation-1"
            :headers="headersEnCours"
            :items="data"
            :loading="loading"
            sortBy="date"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.ville_arrive }}</td>
                <td>{{ row.item.montant }}</td>
                <td>
                  <v-switch
                    :label="`Rammaser`"
                    color="success"
                    @change="changeState(row.item.id)"
                  ></v-switch>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <rammasgeDelete :item="selectedrammasge" />
    <rammasgeUpdate :item="selectedrammasge" />
    <rammasgeCreate :item="selectedrammasge" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import rammasgeDelete from "@/components/popup/rammasge/Delete.vue";
import rammasgeUpdate from "@/components/popup/rammasge/Update.vue";
import rammasgeCreate from "@/components/popup/rammasge/Create.vue";
import ApiService from "@/services/api.service";
import moment from "moment";

export default {
  mounted() {
    this.fetchData(`${this.$app_url}/api/auth/rammasge`);
  },
  filter: {
    formatted(v) {
      var date = moment(v).format("MM/DD/YYYY hh:mm");
      return date;
    },
  },
  data() {
    return {
      current_page: 1,
      last_page: 1,
      switch1: false,
      toggleAfficher: true,
      loading: false,
      headers: [
        { text: "Colis", value: "name", class: "black--text" },
        { text: "User", value: "name", class: "black--text" },
        { text: "Quantity", value: "name", class: "black--text" },
        { text: "Price", value: "claim", class: "black--text" },
        { text: "Date", value: "name", class: "black--text" },
        { text: "Afficher", class: "black--text" },
        { text: "Outils", value: "tools_count", class: "black--text" },
      ],
      headersEnCours: [
        { text: "Colis", value: "name", class: "black--text" },
        { text: "City", value: "ville", class: "black--text" },
        { text: "Price", value: "claim", class: "black--text" },
        { text: "Rammaser", value: "tools_count", class: "black--text" },
      ],

      data: [],
      dialog: false,
      dialog_edit: false,
      dialog_add: false,
      selectedrammasge: null,
    };
  },

  components: {
    Footer,
    Navbar,
    rammasgeDelete,
    rammasgeCreate,
    rammasgeUpdate,
  },

  computed: {
    toggleText() {
      return this.toggleAfficher ? "encours" : "rammase";
    },
  },

  methods: {
    deleteUser(item) {
      this.selectedrammasge = item;
      this.dialog = true;
    },
    addUser() {
      this.dialog_add = true;
    },
    editUser(item) {
      this.selectedrammasge = item;
      this.dialog_edit = true;
    },
    fetchData(url) {
      this.loading = true;

      ApiService.get(url)
        .then((res) => {
          if (this.toggleAfficher) {
            this.data = res.data.data.data;
          } else {
            this.data = res.data.data;
          }
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },

    Toggle() {
      this.toggleAfficher = !this.toggleAfficher;
      this.data = [];
      if (this.toggleAfficher) {
        this.fetchData(`${this.$app_url}/api/auth/rammasge`);
      } else {
        this.fetchData(`${this.$app_url}/api/auth/encours`);
      }
    },
    changeState(item) {
      ApiService.post(`${this.$app_url}/api/auth/rammasge`, {
        colis_id: item,
      })
        .then((response) => {
          this.$emit("flash-success-snackbar", response.data.msg);
          this.fetchData(`${this.$app_url}/api/auth/encours`);
        })
        .then(() => {
          this.toggleAfficher = false;
        })
        .catch((err) => console.log(err));
    },
    onShowClick(item) {
      this.$router.push({ name: "Rammassge.show", params: { id: item.id } });
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
