import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router';
import "@/assets/imgs/index.js";
import global from "./global/globalApi";
import axios from "axios";

//关闭Vue的生产提醒
Vue.config.productionTip = false
Vue.prototype.global = global;
axios.defaults.baseURL = global.baseURL;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
