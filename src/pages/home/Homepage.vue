<template>
  <div id="homepage">
    <Topbar></Topbar>
    <Leftbar></Leftbar>
    <Center></Center>
    <Rightbar></Rightbar>
  </div>
</template>

<script>
import Topbar from "../../components/homepage/Topbar.vue";
import Leftbar from "../../components/homepage/Leftbar.vue";
import Center from "../../components/homepage/Center.vue";
import Rightbar from "../../components/homepage/Rightbar.vue";
export default {
  name: "Homepage",
  components: { Topbar, Leftbar, Center, Rightbar },
};
</script>

<style>
#homepage {
}
</style>