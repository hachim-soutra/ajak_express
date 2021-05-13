<template>
  <v-container class="footer-container">
    <v-row class="white py-4 px-2">
      <v-col sm="4" cols="4" class="pa-0 text-center">
        <v-dialog v-model="email_modal" width="550">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              depressed
              class="footer-btn pa-0 font-weight-bold"
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              Envoyer un E-mail
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="modal-title headline font-weight-bold">
              Envoyer un e-mail

              <v-btn icon class="close-modal" @click="email_modal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="px-12">
              <v-container class="w-80">
                <v-row class="py-5" style="border-bottom: 1px solid #000">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Deborah
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Terrain et budget
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-email</v-icon>
                    <span class="font-weight-medium black--text"
                      >Envoyer un e-mail</span
                    >
                  </v-col>
                </v-row>

                <v-row class="py-5" style="border-bottom: 1px solid #000">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Nouvel Utilisateur
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Animation reseau
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-email</v-icon>
                    <span class="font-weight-medium black--text"
                      >Envoyer un e-mail</span
                    >
                  </v-col>
                </v-row>

                <v-row class="py-5">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Samuel
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Infogerance
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-email</v-icon>
                    <span class="font-weight-medium black--text"
                      >Envoyer un e-mail</span
                    >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col sm="4" cols="4" class="pa-0  text-center">
        <v-dialog v-model="phone_modal" width="550">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              depressed
              class="footer-btn pa-0 font-weight-bold"
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              Appeler
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="modal-title headline font-weight-bold">
              Appeler

              <v-btn icon class="close-modal" @click="phone_modal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="px-12">
              <v-container class="w-80">
                <v-row class="py-5" style="border-bottom: 1px solid #000">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Deborah
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Terrain et budget
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-phone</v-icon>
                    <span class="font-weight-medium black--text">Appeler</span>
                  </v-col>
                </v-row>

                <v-row class="py-5" style="border-bottom: 1px solid #000">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Nouvel Utilisateur
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Animation reseau
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-phone</v-icon>
                    <span class="font-weight-medium black--text">Appeler</span>
                  </v-col>
                </v-row>

                <v-row class="py-5">
                  <v-col sm="6" cols="12">
                    <p class="subtitle-1 ma-0 font-weight-bold black--text">
                      Samuel
                    </p>
                    <p class="subtitle-2 ma-0 font-weight-medium black--text">
                      Infogerance
                    </p>
                  </v-col>
                  <v-col
                    sm="6"
                    cols="12"
                    class="d-flex align-end justify-sm-end justify-start"
                  >
                    <v-icon class="mr-2 black--text">mdi-phone</v-icon>
                    <span class="font-weight-medium black--text">Appeler</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col sm="4" cols="4" class="pa-0  text-center">
        <v-dialog class="footer-dialog" v-model="cgv_modal" width="550">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              tile
              depressed
              class="footer-btn pa-0 font-weight-bold"
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              Production CGV
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="modal-title headline font-weight-bold">
              Production CGV

              <v-btn icon class="close-modal" @click="cgv_modal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="py-4 px-sm-16 px-6">
              <v-container class="w-80">
                <p class="font-weight-medium black--text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                  Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                  eleifend mi, non fermentum diam nisl sit amet erat. Duis
                  semper. Duis arcu massa, scelerisque vitae, consequat in,
                  pretium a, enim. Pellentesque congue. Ut in risus volutpat
                  libero pharetra tempor. Cras vestibulum bibendum augue.
                  Praesent egestas leo in pede. Praesent blandit odio eu enim.
                  Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
                  pellentesque fermentum. Maecenas adipiscing ante non diam
                  sodales hendrerit.
                  <br />
                  <br />
                  Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                  eleifend mi, non fermentum diam nisl sit amet erat. Duis
                  semper. Duis arcu massa, scelerisque vitae, consequat in,
                  pretium a, enim. Pellentesque congue. Ut in risus volutpat
                  libero pharetra tempor. Cras vestibulum bibendum augue.
                  Praesent egestas leo in pede. Praesent blandit odio eu enim.
                  Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
                  pellentesque fermentum. Maecenas adipiscing ante non diam
                  sodales hendrerit.
                  <br />
                  <br />
                  Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
                  adipiscing nec, ultricies sed, dolor. Cras elementum ultrices
                  diam. Maecenas ligula massa, varius a, semper congue, euismod
                  non, mi. Proin porttitor, orci nec nonummy molestie, enim est
                  eleifend mi, non fermentum diam nisl sit amet erat. Duis
                  semper. Duis arcu massa, scelerisque vitae, consequat in,
                  pretium a, enim. Pellentesque congue. Ut in risus volutpat
                  libero pharetra tempor. Cras vestibulum bibendum augue.
                  Praesent egestas leo in pede. Praesent blandit odio eu enim.
                  Pellentesque sed dui ut augue blandit sodales. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede
                  pellentesque fermentum. Maecenas adipiscing ante non diam
                  sodales hendrerit.
                </p>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email_modal: false,
      phone_modal: false,
      cgv_modal: false,
    };
  },
};
</script>

<style lang="scss">
.v-dialog {
  max-height: 500px !important;
}
</style>

<style scoped lang="scss">
.v-dialog {
  .v-card {
    border-radius: 0 !important;
  }

  .modal-title {
    display: flex;
    flex-direction: column;
    text-transform: uppercase;

    &:after {
      content: "";
      display: block;
      background: #000;
      width: 50px;
      height: 3px;
    }

    .close-modal {
      position: absolute;
      left: 5px;
      top: 5px;
      color: #000 !important;
    }
  }
}

.footer-btn {
  font-size: 10px;

  &:hover {
    &:after {
      content: "";
      display: block;
      background: #000;
      width: 50px;
      height: 2px;
      position: absolute;
      bottom: 0;
    }
  }
}

@media only screen and (min-width: 425px) {
  .footer-btn {
    font-size: 12px;
  }
}

@media only screen and (min-width: 600px) {
  .footer-btn {
    font-size: 16px;
  }
}
</style>
