<template>
  <div id="expandBtn" :style="styleVar">
    <svg-icon icon-class="arrow-left" class="shrinkIcon"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "ExpandBtn",
  props: {
    direction: {
      type: String,
      default: "left",
    },
    iconColor: {
      tyle: String,
      default: "#64666d",
    },
    hoverIconColor: {
      type: String,
      default: "#fff",
    },
  },
  computed: {
    styleVar() {
      return {
        "--rotate": this.direction === "left" ? "0deg" : "180deg",
        "--iconColor": this.iconColor,
        "--hoverIconColor": this.hoverIconColor,
      };
    },
  },
};
</script>

<style scoped>
#expandBtn {
  display: flex;
  position: relative;
  align-items: center;
  width: 15rem;
  height: 4rem;
  transform: rotate(var(--rotate));
}
.shrinkIcon {
  position: absolute;
  width: 2rem;
  height: 4rem;
  vertical-align: middle;
  color: var(--iconColor);
  right: 5%;
}
.shrinkIcon:hover {
  color: var(--hoverIconColor);
  cursor: pointer;
}
</style>