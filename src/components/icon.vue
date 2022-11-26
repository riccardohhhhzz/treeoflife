<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon" + this.className;
      } else {
        return "svg-icon";
      }
    },
  },
};
</script>

<style>
.svg-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.2rem;
  fill: currentColor;
  overflow: hidden;
}
</style>