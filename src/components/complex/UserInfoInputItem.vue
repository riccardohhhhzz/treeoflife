<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <TextInput :inputType="inputType" v-if="showTextInput"></TextInput>
    <TimeDropdown v-if="showTimeDropdown"></TimeDropdown>
    <div class="hintBox" v-if="showWarn">
      <svg-icon icon-class="warn"></svg-icon>
      <h3 class="hint">{{ hint }}</h3>
    </div>
  </div>
</template>

<script>
import TimeDropdown from "./TimeDropdown.vue";
import TextInput from "../basic/TextInput.vue";
export default {
  name: "UserInfoInputItem",
  components: { TimeDropdown, TextInput },
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    hint: {
      type: String,
    },
    // text,password,birthday
    inputType: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      showWarn: false,
    };
  },
  computed: {
    showTextInput() {
      return this.inputType == "text" || this.inputType == "password";
    },
    showTimeDropdown() {
      return this.inputType == "birthday";
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
.hintBox {
  padding-left: 20px;
  width: 280px;
}
</style>