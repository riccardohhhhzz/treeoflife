<template>
  <div id="homepage">
    <Topbar></Topbar>
    <Leftbar></Leftbar>
    <div id="homepage-center">
      <div class="topbar-area"></div>
      <keep-alive :exclude="['MyHealth']">
        <router-view></router-view>
      </keep-alive>
    </div>
    <Rightbar></Rightbar>
    <MyDialog></MyDialog>
  </div>
</template>

<script>
import Topbar from "../../components/homepage/Topbar.vue";
import Leftbar from "../../components/homepage/Leftbar.vue";
import MyHealth from "../../components/homepage/MyHealth.vue";
import Rightbar from "../../components/homepage/Rightbar.vue";
import MyDialog from "../../components/basic/MyDialog.vue";
export default {
  name: "Homepage",
  components: { Topbar, Leftbar, MyHealth, Rightbar, MyDialog },
};
</script>

<style>
#homepage-center {
  margin: 0rem 15rem;
  padding: 40px;
}
.topbar-area {
  height: 4.8rem;
}
</style>