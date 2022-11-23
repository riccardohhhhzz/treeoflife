<template>
  <div class="homepage">
    <Topbar></Topbar>
    <Leftbar></Leftbar>
  </div>
</template>

<script>
import Topbar from "../../components/homepage/Topbar.vue";
import Leftbar from "../../components/homepage/Leftbar.vue";
export default {
  name: "Homepage",
  components: { Topbar, Leftbar },
};
</script>

<style>
.homepage {
  width: 100vw;
  height: 100vh;
}
</style>