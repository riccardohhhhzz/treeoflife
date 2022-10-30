<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <div class="myInput clearfix">
      <input :type="localInputType" class="basic" />
      <svg-icon
        :icon-class="eyeIcon"
        class="eye"
        @click.native="changeEyeIcon"
        v-if="showEye"
      ></svg-icon>
    </div>
    <div class="hintBox" v-if="showWarn">
      <svg-icon icon-class="warn"></svg-icon>
      <h3 class="hint">{{ hint }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    inputType: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    showWarn: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
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
h2 {
  font-size: 18px;
  font-weight: 400;
  color: #333333;
  width: fit-content;
}
h3 {
  font-size: 14px;
  font-weight: 400;
  color: #6e6e6e;
  width: fit-content;
}
input:hover {
  border: 1px solid #939597;
}
input:focus {
  border: 1px solid #5e5e5e;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
  /* 去掉默认input焦点边框 */
  outline: none;
}
.title {
  margin-bottom: 10px;
}
.subtitle {
  margin-bottom: 5px;
}
.hint {
  display: inline;
  margin-left: 10px;
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
.hintBox {
  padding-left: 20px;
  width: 280px;
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
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>