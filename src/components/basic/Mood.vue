<template>
  <div id="mood">
    <div
      class="mood-circle"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <svg-icon
        :icon-class="type"
        class="icon"
        v-if="!showDefault"
        :style="iconStyleVar"
      ></svg-icon>
      <div class="default" v-if="showDefault"></div>
    </div>
    <div class="hover-hint" v-show="hover && showHoverHint">
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
  props: {
    type: {
      type: String,
      default: "default",
    },
    date: {
      type: String,
    },
    width: {
      type: String,
      default: "1.4rem",
    },
    showHoverHint: {
      type: Boolean,
      default: true,
    },
  },
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
    iconStyleVar() {
      return {
        "--width": this.width,
      };
    },
  },
};
</script>

<style scoped>
.icon {
  width: var(--width);
  height: var(--width);
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