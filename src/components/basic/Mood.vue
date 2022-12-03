<template>
  <div id="mood">
    <svg-icon :icon-class="type" class="icon" v-if="!showDefault"></svg-icon>
    <div class="default" v-if="showDefault"></div>
  </div>
</template>

<script>
export default {
  name: "Mood",
  props: ["type"],
  computed: {
    showDefault() {
      return this.type === "default";
    },
  },
};
</script>

<style scoped>
.icon {
  width: 1.4rem;
  height: 1.4rem;
}
.default {
  width: 1rem;
  height: 1rem;
  background-color: #e3e3e3;
  border-radius: 1rem;
  border: 2px solid #333333;
}
</style>