import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router';
import "@/assets/imgs/index.js";
import global from "./global/globalApi";
import axios from "axios";
import store from "./store";
//关闭Vue的生产提醒
Vue.config.productionTip = false

//配置全局项
Vue.prototype.global = global;
//配置baseURL
axios.defaults.baseURL = global.baseURL;

//使用插件
Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')
