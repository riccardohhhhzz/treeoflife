<template>
  <div id="navItem" :style="styleVar">
    <svg-icon :icon-class="icon" class="navIcon" :style="styleVar"></svg-icon>
    <span class="navName" :style="styleVar"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    icon: {
      type: String,
    },
    focused: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styleVar() {
      return {
        "--bgColor": this.focused ? "#F9F9F9" : "transparent",
        "--hoverBgColor": this.focused ? "#F9F9F9" : "#676c7d",
        "--hoverItemColor": this.focused ? "#64666d" : "#cccccc",
        "--cursor": this.focused ? "default" : "pointer",
      };
    },
  },
};
</script>

<style scoped>
#navItem {
  display: flex;
  width: 15rem;
  height: 4rem;
  background-color: var(--bgColor);
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
  background-color: var(--hoverBgColor);
  cursor: var(--cursor);
}
#navItem:hover .navIcon {
  color: var(--hoverItemColor);
}
#navItem:hover .navName {
  color: var(--hoverItemColor);
}
</style>