import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios';
import Notifications from 'vue-notification'
Vue.config.productionTip = false;
axios.defaults.baseURL="https://localhost:44376/";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')