<template>
  <div id="icon-btn" :style="styleVar">
    <svg-icon :icon-class="icon" class="icon" :style="styleVar"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "IconBtn",
  props: {
    icon: {
      type: String,
    },
    iconWidth: {
      type: String,
    },
    iconColor: {
      type: String,
      default: "currentColor",
    },
  },
  computed: {
    styleVar() {
      return {
        "--iconWidth": this.iconWidth,
        "--iconColor": this.iconColor,
      };
    },
  },
};
</script>

<style scoped>
#icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
#icon-btn:hover {
  cursor: pointer;
}
.icon {
  width: var(--iconWidth);
  height: var(--iconWidth);
  color: var(--iconColor);
}
</style>