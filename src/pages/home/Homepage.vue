<template>
  <div id="homepage">
    <Topbar></Topbar>
    <Leftbar></Leftbar>
    <div id="homepage-center">
      <MyHealth></MyHealth>
    </div>
    <Rightbar></Rightbar>
  </div>
</template>

<script>
import Topbar from "../../components/homepage/Topbar.vue";
import Leftbar from "../../components/homepage/Leftbar.vue";
import MyHealth from "../../components/homepage/MyHealth.vue";
import Rightbar from "../../components/homepage/Rightbar.vue";
export default {
  name: "Homepage",
  components: { Topbar, Leftbar, MyHealth, Rightbar },
};
</script>

<style>
#homepage-center {
  margin: 0rem 15rem;
  padding: 40px;
}
</style>