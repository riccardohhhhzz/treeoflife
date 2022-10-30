<template>
  <button>
    <slot>按钮</slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
};
</script>

<style scoped>
button {
  padding: 0px 10px;
  width: 140px;
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