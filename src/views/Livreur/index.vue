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
            Livreur
          </p>
        </v-col>

        <v-col sm="4" cols="12" class="d-flex align-end actions-btn-container">
          <v-btn class="black-btn " tile outlined depressed @click="addUser()"
            >ajouter nouveau livreur</v-btn
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
                <td>{{ row.item.phone }}</td>
                <td>{{ row.item.status }}</td>
                <td>{{ row.item.city }}</td>
                <td>{{ row.item.created_at | formatted }}</td>
                <td>{{ row.item.colis_encore }}</td>
                <td>{{ row.item.colis_return }}</td>
                <td>{{ row.item.colis_livre }}</td>
                <td>{{ row.item.total }}</td>
                <td>{{ row.item.totalNet }}</td>
                <td>{{ row.item.payed }}</td>

                <td @click="facuter(row.item)">
                  <v-btn icon small color="black">
                    <v-icon dark>mdi-printer</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    icon
                    small
                    color="black"
                    @click="onShowClick(row.item)"
                  >
                    <v-icon dark>mdi-eye</v-icon>
                  </v-btn>
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
    <UserDelete :item="selectedUser" />
    <UserUpdate :item="selectedUser" />
    <UserCreate :item="selectedUser" />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
import UserDelete from "@/components/popup/LivreurDelete.vue";
import UserUpdate from "@/components/popup/LivreurUpdate.vue";
import UserCreate from "@/components/popup/LivreurCreate.vue";
import ApiService from "@/services/api.service";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  computed: {
    logo_img: function() {
      return require("@/assets/logo.png");
    },
  },
  mounted() {
    this.fetchData(`${this.$app_url}/api/auth/livreur`);
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
      loading: false,
      headers: [
        { text: "Name", value: "name", class: "black--text" },
        { text: "telephone", value: "claim", class: "black--text" },
        { text: "Status", value: "date", class: "black--text" },
        { text: "City", class: "black--text" },
        { text: "Date inscription", class: "black--text" },
        { text: "Colis", class: "black--text" },
        { text: "Colis return", class: "black--text" },
        { text: "Colis livré", class: "black--text" },
        { text: "Total", class: "black--text" },
        { text: "Total Net", class: "black--text" },
        { text: "Bounuce", class: "black--text" },
        { text: "B.Livraison", class: "black--text" },
        { text: "Outils", value: "tools_count", class: "black--text" },
      ],

      data: [],
      dialog: false,
      dialog_edit: false,
      dialog_add: false,
      selectedUser: null,
    };
  },

  components: {
    Footer,
    Navbar,
    UserDelete,
    UserCreate,
    UserUpdate,
  },
  methods: {
    deleteUser(item) {
      this.selectedUser = item;
      this.dialog = true;
    },
    addUser() {
      this.dialog_add = true;
    },
    editUser(item) {
      this.selectedUser = item;
      this.dialog_edit = true;
    },

    facuter(item) {
      const doc = new jsPDF("p", "pt", "a4");
      var width = doc.internal.pageSize.getWidth();
      // var height = doc.internal.pageSize.getHeight();
      var imgHeader = this.logo_img;

      // header
      doc.addImage(imgHeader, "JPEG", 0, 25, width / 3, 50);
      doc.setFontSize(16);
      doc.setFont("normal", "normal", 500);
      doc.setTextColor(0, 0, 0);
      doc.text(this.$store.state.user.name, 20 + width / 2, 35);
      doc.setFontSize(12);
      doc.setFont("normal", "normal", 700);
      doc.text(this.$store.state.user.email, 20 + width / 2, 55);
      doc.text(
        this.$store.state.user.phone ? this.$store.state.user.phone : "",
        20 + width / 2,
        75
      );

      doc.setFontSize(12);
      doc.setFont("normal", "normal", 500);
      doc.setTextColor(85, 170, 29);
      doc.text("B.LIVRAISON ", 20, 100);
      doc.setFontSize(12);
      doc.setFont("normal", "normal", 500);
      doc.setTextColor(0, 0, 0);
      doc.text("LIVREUR " + item.name, 20, 120);
      doc.text("user " + this.$store.state.user.name, 20, 135);
      doc.text("colis : " + item.colis.length, 20, 150);

      var columns = [
        {
          title: "Code",
          dataKey: "token",
        },
        {
          title: "Client",
          dataKey: "name",
        },
        {
          title: "ville_arrive",
          dataKey: "ville_arrive",
        },
        {
          title: "telephone",
          dataKey: "phone",
        },
        {
          title: "montant",
          dataKey: "montant",
        },
        {
          title: "adresse",
          dataKey: "adresse",
        },
      ];

      var options = {
        margin: {
          top: 180,
          left: 20,
        },
        startY: doc.autoTableEndPosY() + 180,
        // pageBreak: 'avoid',
        headStyles: {
          fontSize: 10,
          halign: "left",
        },
        bodyStyles: {
          fontSize: 8,
          halign: "left",
          company: {
            halign: "left",
          },
        },
        columnStyles: {
          0: {
            halign: "left",
            textColor: [28, 126, 214],
          },
        },
        footStyles: {
          fontSize: 10,
          halign: "right",
        },
        showFoot: "lastPage",
      };
      doc.autoTable(columns, item.colis, options);
      doc.text("Total brut :", width/2, doc.autoTable.previous.finalY + 30);
      doc.text(item.totalNet+" Dhs", width-50, doc.autoTable.previous.finalY + 30,'right');
      doc.text(
        "Frais de livraison :",
        width / 2,
        doc.autoTable.previous.finalY + 50
      );
      doc.text(
        ( item.total - item.totalNet)+" Dhs",
        width-50,
        doc.autoTable.previous.finalY + 50,'right'
      );
      doc.text("Total NET:", width / 2, doc.autoTable.previous.finalY + 70);
      doc.text(item.total+" Dhs", width-50, doc.autoTable.previous.finalY + 70,'right');
      doc.save("table.pdf");
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
      this.$router.push({ name: "Livreur.show", params: { id: item.id } });
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
