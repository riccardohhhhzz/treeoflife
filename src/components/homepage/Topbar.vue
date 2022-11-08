<template>
  <div id="topbar">
    <div class="logo">
      <h1>TREEOFLIFE</h1>
    </div>
    <div class="nav">
      <SearchInput class="search"></SearchInput>
    </div>
  </div>
</template>

<script>
import SearchInput from "../complex/SearchInput.vue";
export default {
  name: "Topbar",
  components: { SearchInput },
};
</script>

<style scoped>
#topbar {
  height: 7%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.logo {
  width: 15rem;
  height: 100%;
  background-color: #4dcf90;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
}
.logo h1 {
  font-size: 28px;
  color: #fff;
}
.nav {
  height: 100%;
  float: left;
}
.nav > .search {
  margin-left: 2rem;
  margin-top: 1rem;
}
</style>