<template>
  <div>
    <h2 class="title" :style="styleVar">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <TextInput
      :inputType="inputType"
      :width="inputWidth"
      :height="inputHeight"
      :bgColor="inputBgColor"
      v-if="showTextInput"
      class="textInput"
      @update="getValue"
      @updateImmediately="sendValue"
    ></TextInput>
    <TimeSelect
      v-if="showTimeDropdown"
      @update="sendValue($event), getValue($event)"
      class="timeSelect"
      :yearWidth="birthdayYearWidth"
      :monthWidth="birthdayMonthWidth"
      :dayWidth="birthdayDayWidth"
    ></TimeSelect>
    <MyRadio v-if="showMyRadio" :optionsArr="optionsArr"></MyRadio>
    <MySelect
      v-if="showNormalDropdown"
      :arr="optionsArr"
      width="100%"
    ></MySelect>
    <div class="hintBox" v-if="hint.length > 0">
      <svg-icon icon-class="warn"></svg-icon>
      <h3 class="hint">{{ hint }}</h3>
    </div>
  </div>
</template>

<script>
import TimeSelect from "./TimeSelect.vue";
import TextInput from "../basic/TextInput.vue";
import MyRadio from "../basic/MyRadio.vue";
import MySelect from "../basic/MySelect.vue";
export default {
  name: "UserInfoInputItem",
  components: { TimeSelect, TextInput, MyRadio, MySelect },
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    hint: {
      type: String,
      default: "",
    },
    // text,password,birthday,radio,dropdown
    inputType: {
      type: String,
      default: "text",
    },
    optionsArr: {
      type: Array,
    },
    titleFontSize: {
      type: String,
      default: "18px",
    },
    titleFontWeight: {
      type: String,
      default: "400",
    },
    inputWidth: {
      type: String,
      default: "100%",
    },
    inputHeight: {
      type: String,
      default: "40px",
    },
    inputBgColor: {
      type: String,
      default: "#e9f0fe",
    },
    birthdayYearWidth: {
      type: String,
      default: "80px",
    },
    birthdayMonthWidth: {
      type: String,
      default: "70px",
    },
    birthdayDayWidth: {
      type: String,
      default: "70px",
    },
  },
  data() {
    return {
      value: null,
    };
  },
  computed: {
    styleVar() {
      return {
        "--title-font-size": this.titleFontSize,
        "--title-font-weight": this.titleFontWeight,
      };
    },
    showTextInput() {
      return this.inputType === "text" || this.inputType === "password";
    },
    showTimeDropdown() {
      return this.inputType === "birthday";
    },
    showMyRadio() {
      return this.inputType === "radio";
    },
    showNormalDropdown() {
      return this.inputType === "dropdown";
    },
  },
  methods: {
    getValue(newValue) {
      this.value = newValue;
    },
    sendValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: var(--title-font-size);
  font-weight: var(--title-font-weight);
  color: #333333;
}
h3 {
  font-size: 14px;
  font-weight: 400;
  color: #6e6e6e;
}
.title {
  margin-bottom: 10px;
}
.subtitle {
  margin-bottom: 5px;
}
.textInput,
.timeSelect {
  margin-bottom: 5px;
}
.hint {
  display: inline;
  margin-left: 10px;
}
.hintBox {
  padding-left: 20px;
  width: calc(100% - 20px);
}
</style>