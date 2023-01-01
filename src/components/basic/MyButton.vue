<template>
  <button :style="styleVar">
    <span v-if="!loading">
      <svg-icon :icon-class="icon" v-if="showIcon" class="myIcon"></svg-icon>
      <slot>button</slot>
    </span>
    <span v-if="loading">
      <svg-icon icon-class="loading-btn" class="loading-icon"></svg-icon>
      <p class="content">{{ loadingText }}</p>
    </span>
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
    borderColor: {
      type: String,
    },
    paddingHorizon: {
      type: Number,
      default: 12,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
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
        "--hoverColor": this.loading
          ? this.bgColor
          : this.clickable
          ? this.hoverColor
          : "#E5E5E5",
        "--borderColor": this.borderColor,
        "--paddingHorizon": this.paddingHorizon + "px",
        "--cursor": this.loading
          ? "default"
          : this.clickable
          ? "pointer"
          : "default",
        "--opacity": this.loading ? "0.8" : "1",
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
  border: 1px solid var(--borderColor);
  border-radius: 6px;
  opacity: var(--opacity);
}
button:hover {
  background-color: var(--hoverColor);
  cursor: var(--cursor);
}
button span {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}
@keyframes rotateRight {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-icon {
  color: #fff;
  width: 28px;
  height: 28px;
  font-weight: 600;
  animation: rotateRight 1.5s linear infinite;
}
.myIcon {
  margin-right: 2px;
  vertical-align: middle;
}
</style>