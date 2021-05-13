import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
import vuelidate from "vuelidate";
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Gate from "./Gate";
import ApiService from './services/api.service';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

ApiService.init();

import Config from './config.js'
Vue.prototype.$app_url = Config.app_url;
Vue.prototype.$base_name = Config.base_name;
Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.use(moment);
Vue.use(vuelidate);
Vue.use(jsPDF)
Vue.prototype.$gate = new Gate(window.user);
Vue.use(VueToast);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
