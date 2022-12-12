<template>
  <div>
    <a @click="changeRoute" :style="styleVar"><slot></slot></a>
  </div>
</template>

<script>
export default {
  name: "LinkText",
  props: {
    fontSize: {
      type: Number,
      default: 16,
    },
    showUnderLine: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    styleVar() {
      return {
        "--fontSize": this.fontSize + "px",
        "--underlineHeight": this.showUnderLine ? "1.5px" : null,
      };
    },
  },
  methods: {
    changeRoute() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
a {
  position: relative;
  color: #3a62ca;
  font-size: var(--fontSize);
}
a::before {
  content: "";
  position: absolute;
  top: 100%;
  width: 100%;
  height: var(--underlineHeight);
  background-color: #3a62ca;
  transform: scaleX(0);
  transition: all 0.3s;
}
a::before {
  left: 0;
}
a:hover {
  cursor: pointer;
}
a:hover::before {
  transform: scaleX(1);
}
</style>