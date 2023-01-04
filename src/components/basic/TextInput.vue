<template>
  <div class="myInput" :style="styleVar">
    <input
      :type="localInputType"
      class="basic"
      v-model="str"
      @blur="sendMessage('update')"
      @input="sendMessage('updateImmediately')"
      :style="styleVar"
      :readonly="readOnly ? 'readonly' : null"
    />
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
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "40px",
    },
    bgColor: {
      type: String,
      default: "#e9f0fe",
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
    focusBorderColor: {
      type: String,
      default: "#5e5e5e",
    },
    showShadow: {
      type: Boolean,
      default: true,
    },
    defaultValue: {
      type: String,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pswIsVisible: false,
      // 用户输入的String
      str: this.defaultValue,
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
    styleVar() {
      return {
        "--bgColor": this.bgColor,
        "--width": this.width,
        "--height": this.height,
        "--borderRadius": this.borderRadius + "px",
        "--focusBorderColor": this.readOnly ? "#cdcdcd" : this.focusBorderColor,
        "--shadow": this.showShadow ? "rbga(0, 0, 0, 0.25)" : "none",
        "--hover-border-color": this.readOnly ? "#cdcdcd" : "#939597",
        "--hover-cursor": this.readOnly ? "default" : "text",
        "--color": this.readOnly ? "#cdcdcd" : "#333333",
      };
    },
  },
  methods: {
    changeEyeIcon() {
      this.pswIsVisible = !this.pswIsVisible;
    },
    sendMessage(eventName) {
      this.$emit(eventName, this.str);
    },
  },
};
</script>

<style scoped>
.myInput {
  /* padding会把盒子撑大，加上边框计算得出 */
  width: var(--width);
  position: relative;
}
input:hover {
  border: 1px solid var(--hover-border-color);
  cursor: var(--hover-cursor);
}
input:focus {
  border: 1px solid var(--focusBorderColor);
  box-shadow: 0px 0px 6px 0px var(--shadow);
  /* 去掉默认input焦点边框 */
  outline: none;
}
.basic {
  width: calc(var(--width) - 22px);
  height: var(--height);
  font-size: 16px;
  border: 1px solid #cdcdcd;
  background-color: var(--bgColor);
  border-radius: var(--borderRadius);
  color: var(--color);
  padding: 0px 10px;
}
.eye {
  position: absolute;
  left: 90%;
  top: 25%;
}
.eye:hover {
  cursor: pointer;
}
</style>