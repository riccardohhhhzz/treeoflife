<template>
  <button :style="styleVar">
    <slot>按钮</slot>
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
  },
  computed: {
    styleVar() {
      return {
        "--width": this.width + "px",
      };
    },
  },
};
</script>

<style scoped>
button {
  padding: 0px 10px;
  width: var(--width);
  height: 48px;
  font-size: 18px;
  background-color: #4dcf90;
  color: #fff;
  border: 0px;
  border-radius: 6px;
}
button:hover {
  background-color: #59d79a;
  cursor: pointer;
}
</style>