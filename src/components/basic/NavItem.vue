<template>
  <div id="navItem">
    <svg-icon
      :icon-class="icon"
      class="navIcon"
      class-name="navIcon"
    ></svg-icon>
    <span class="navName"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: ["icon"],
};
</script>

<style scoped>
#navItem {
  display: flex;
  width: 15rem;
  height: 4rem;
  background-color: transparent;
  align-items: center;
  transition: 0.2s;
}
.navIcon {
  margin-left: 2.4rem;
  color: #64666d;
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
}
.navName {
  color: #64666d;
  font-size: 20px;
  font-weight: bold;
  margin-left: 1rem;
  vertical-align: middle;
}
#navItem:hover {
  background-color: #676c7d;
  cursor: pointer;
}
#navItem:hover .navIcon {
  color: #cccccc;
}
#navItem:hover .navName {
  color: #cccccc;
}
</style>