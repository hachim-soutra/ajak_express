<template>
  <div class="white">
    <div class="mx-auto w-80">
      <v-row no-gutters>
        <v-app-bar color="white" flat height="100">
          <v-app-bar-nav-icon
            color="black"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <img src="~@/assets/logo.png" alt="Mynoblessa" />

          <v-spacer></v-spacer>

          <v-btn
            class="align-center d-flex justify-end pa-0"
            to="/profil"
            depressed
            tile
            color="white"
          >
            <v-icon>mdi-account-outline</v-icon>
            <span class="d-md-flex d-none">
              {{ user }}
            </span>
          </v-btn>
        </v-app-bar>
      </v-row>
    </div>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary width="400">
      <v-row class="py-2 px-4">
        <v-col class="nav-menu menu-container" cols="12">
          <v-btn to="/campagnes" tile plain class="menu-btn menu-campagnes">
            <p class="menu-item-text">Mes campagnes commerciales</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="12">
          <v-btn to="/point-vente" tile plain class="menu-btn menu-point-vente">
            <p class="menu-item-text">Mon point de vente</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="12">
          <v-btn to="/activation" tile plain class="menu-btn menu-activation">
            <p class="menu-item-text">Mon activation</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="12">
          <v-btn
            to="/reseaux-sociaux"
            tile
            plain
            class="menu-btn menu-reseaux-sociaux"
          >
            <p class="menu-item-text">Mes réseaux sociaux</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="12">
          <v-btn
            to="/corporate-beau-vivre"
            tile
            plain
            class="menu-btn menu-corporate-beau-vivre"
          >
            <p class="menu-item-text">Corporate Le Beau Vivre</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="6">
          <v-btn to="/produits" tile plain class="menu-btn menu-produits">
            <p class="menu-item-text">Mes Produits</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>

        <v-col class="nav-menu menu-container" cols="6">
          <v-btn
            to="/kit-ouverture"
            tile
            plain
            class="menu-btn menu-kit-ouverture font-weight-regular"
          >
            <p class="menu-item-text">Mon kit d'ouverture</p>
            <div class="menu-item-img"></div>
          </v-btn>
        </v-col>
      </v-row>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.name;
    },
  },
  mounted() {
    console.log(this.user);
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/styles/navigation.scss";

.v-toolbar .v-toolbar__content {
  padding: 0;
}
</style>
