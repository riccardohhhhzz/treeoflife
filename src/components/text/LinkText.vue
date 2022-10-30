<template>
  <div>
    <a
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @click="changeRoute"
      >{{ content }}</a
    >
    <transition name="expand">
      <div class="underline" :style="styleVar" v-if="hover"></div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LinkText",
  props: ["routeName", "content"],
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    styleVar() {
      return {
        "--width": this.content.length * 16 + "px",
      };
    },
  },
  methods: {
    changeRoute() {
      this.$router.push({
        name: this.routeName,
      });
    },
  },
};
</script>

<style scoped>
a {
  color: #3a62ca;
  font-size: 16px;
}
a:hover {
  cursor: pointer;
}
.underline {
  height: 1.5px;
  width: var(--width);
  margin-top: 2px;
  background-color: #3a62ca;
}
.expand-enter,
.expand-leave-to {
  width: 0;
}
.expand-leave,
.expand-enter-to {
  width: var(--width);
}
.expand-enter-active,
.expand-leave-active {
  transition: 0.3s ease;
}
</style>