// src/store/index.js
import Vue from "vue"
//引入Vuex
import Vuex from "vuex"
import userAbout from "./user.js"
Vue.use(Vuex)

//创建并暴露store
export default new Vuex.Store({
    modules: { userAbout }
})