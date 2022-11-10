<template>
  <div id="topbar">
    <div class="logo">
      <h1>TREEOFLIFE</h1>
    </div>
    <div class="nav">
      <SearchInput class="search"></SearchInput>
      <MyDropdown class="createNew"></MyDropdown>
    </div>
  </div>
</template>

<script>
import SearchInput from "../complex/SearchInput.vue";
import MyDropdown from "../basic/MyDropdown.vue";
export default {
  name: "Topbar",
  components: { SearchInput, MyDropdown },
};
</script>

<style scoped>
#topbar {
  height: 4.8rem;
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
  width: calc(100% - 15rem);
}
.nav > .search {
  display: inline-block;
  margin-left: 2rem;
  margin-top: 1.2rem;
  width: 35%;
  float: left;
}
.nav > .createNew {
  display: inline-block;
  float: left;
  margin-top: 1.2rem;
  margin-left: calc(50% - 15rem);
}
</style>