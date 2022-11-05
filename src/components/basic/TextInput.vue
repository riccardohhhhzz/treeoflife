<template>
  <div class="myInput">
    <input :type="localInputType" class="basic" />
    <svg-icon
      :icon-class="eyeIcon"
      class="eye"
      @click.native="changeEyeIcon"
      v-if="showEye"
    ></svg-icon>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  props: {
    // text,password
    inputType: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      pswIsVisible: false,
    };
  },
  computed: {
    eyeIcon() {
      return this.pswIsVisible ? "eyeClose" : "eyeOpen";
    },
    localInputType() {
      if (this.inputType == "password") {
        return this.pswIsVisible ? "text" : "password";
      } else {
        return this.inputType;
      }
    },
    showEye() {
      if (this.inputType == "password") {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    changeEyeIcon() {
      this.pswIsVisible = !this.pswIsVisible;
    },
  },
};
</script>

<style scoped>
input:hover {
  border: 1px solid #939597;
}
input:focus {
  border: 1px solid #5e5e5e;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  /* 去掉默认input焦点边框 */
  outline: none;
}
.basic {
  width: 278px;
  height: 36px;
  font-size: 16px;
  border: 1px solid #cdcdcd;
  background-color: #e9f0fe;
  color: #333333;
  padding: 0px 10px;
  margin-bottom: 5px;
}
.eye {
  position: absolute;
  left: 90%;
  top: 20%;
}
.eye:hover {
  cursor: pointer;
}
.myInput {
  /* padding会把盒子撑大，加上边框计算得出 */
  width: 302px;
  position: relative;
}
</style>