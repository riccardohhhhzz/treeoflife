<template>
  <button :style="styleVar">
    <svg-icon :icon-class="icon" v-if="showIcon" class="myIcon"></svg-icon>
    <slot class="content">button</slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    width: {
      type: Number,
      default: 140,
    },
    height: {
      type: Number,
      default: 48,
    },
    fontSize: {
      type: Number,
      default: 18,
    },
    routeName: {
      type: String,
    },
    icon: {
      type: String,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#fff",
    },
    bgColor: {
      type: String,
      default: "#4dcf90",
    },
    hoverColor: {
      type: String,
      default: "#59d79a",
    },
    paddingHorizon: {
      type: Number,
      default: 10,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    styleVar() {
      return {
        "--width": this.width + "px",
        "--height": this.height + "px",
        "--fontSize": this.fontSize + "px",
        "--color": this.color,
        "--bgColor": this.clickable ? this.bgColor : "#E5E5E5",
        "--hoverColor": this.clickable ? this.hoverColor : "#E5E5E5",
        "--paddingHorizon": this.paddingHorizon + "px",
        "--cursor": this.clickable ? "pointer" : "default",
      };
    },
  },
};
</script>

<style scoped>
button {
  outline: none;
  padding: 0px var(--paddingHorizon);
  width: var(--width);
  height: var(--height);
  font-size: var(--fontSize);
  background-color: var(--bgColor);
  color: var(--color);
  border: 0px;
  border-radius: 6px;
}
button:hover {
  background-color: var(--hoverColor);
  cursor: var(--cursor);
}
.myIcon {
  margin-right: 2px;
  vertical-align: middle;
}
.content {
  vertical-align: middle;
}
</style>