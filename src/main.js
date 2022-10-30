import Vue from 'vue'
import App from './App.vue'
import "@/assets/imgs/index.js";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
