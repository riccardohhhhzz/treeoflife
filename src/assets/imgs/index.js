// 默认导入所有src文件夹下的icons文件(自动导入，不需手动一个个导入)
import Vue from "vue";
import svgIcon from "@/components/icon.vue";//写了组件在打开 用于注册组件

Vue.component("svg-icon", svgIcon);//写了组件在打开 用于注册组件

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svgs", false, /.svg$/);
requireAll(req);