<template>
  <div id="homepage">
    <Topbar></Topbar>
    <Leftbar></Leftbar>
    <Center></Center>
  </div>
</template>

<script>
import Topbar from "../../components/homepage/Topbar.vue";
import Leftbar from "../../components/homepage/Leftbar.vue";
import Center from "../../components/homepage/Center.vue";
export default {
  name: "Homepage",
  components: { Topbar, Leftbar, Center },
};
</script>

<style>
#homepage {
  /* width: 100vw;
  height: 100vh; */
}
</style>