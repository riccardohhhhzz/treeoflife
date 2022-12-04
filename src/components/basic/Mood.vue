<template>
  <div id="mood">
    <div
      class="mood-circle"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <svg-icon :icon-class="type" class="icon" v-if="!showDefault"></svg-icon>
      <div class="default" v-if="showDefault"></div>
    </div>
    <div class="hover-hint" v-show="hover">
      <p class="hint-content">日期: {{ date }}</p>
      <p class="hint-content">状态: {{ condition }}</p>
    </div>
  </div>
</template>

<script>
var conditionMap = {
  "very-happy": "愉悦",
  happy: "开心",
  netural: "平静",
  bad: "郁闷",
  "very-bad": "难受",
  default: "无",
};
export default {
  name: "Mood",
  props: ["type", "date"],
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    showDefault() {
      return this.type === "default";
    },
    condition() {
      return conditionMap[this.type];
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
.hover-hint {
  position: absolute;
  z-index: 2;
  left: 120%;
  top: -110%;
  width: 7rem;
  background-color: #f6f6d4;
  border: 1px solid #efd99f;
  padding: 5px;
}
.hint-content {
  display: inline-block;
  color: #666666;
  font-size: 14px;
}
</style>