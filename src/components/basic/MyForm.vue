<template>
  <div id="myForm" v-show="showForm">
    <div class="form-mask" v-show="showForm"></div>
    <transition name="form-body">
      <div class="form-body" v-show="showForm" :style="styleVar">
        <div class="top-bar"></div>
        <svg-icon
          icon-class="clearInput"
          class="close-btn"
          @click.native="closeForm"
        ></svg-icon>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MyForm",
  props: {
    minHeight: {
      type: String,
      default: "400px",
    },
    maxHeight: {
      type: String,
      default: "500px",
    },
  },
  data() {
    return {
      showForm: false,
    };
  },
  computed: {
    styleVar() {
      return {
        "--min-height": this.minHeight,
        "--max-height": this.maxHeight,
      };
    },
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.form-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  background-color: black;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.form-body {
  position: fixed;
  width: 700px;
  min-height: var(--min-height);
  max-height: var(--max-height);
  top: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  z-index: 101;
}
.form-body .top-bar {
  width: 100%;
  height: 10px;
  background-color: #4dcf90;
  border-radius: 10px 10px 0px 0px;
}
.form-body .close-btn {
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  top: 12px;
  right: 5px;
}
.form-body .close-btn:hover {
  cursor: pointer;
}
/* 表单出现动画 */
.form-body-enter,
.form-body-leave-to {
  transform: translateY(-10%);
  opacity: 0.6;
}

.form-body-leave,
.form-body-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.form-body-enter-active,
.form-body-leave-active {
  transition: 800ms;
}
</style>