<template>
  <div>
    <h2 class="title">{{ title }}</h2>
    <h3 class="subtitle">{{ subtitle }}</h3>
    <TextInput
      :inputType="inputType"
      v-if="showTextInput"
      class="textInput"
      @update="getValue"
      @updateImmediately="sendValue"
    ></TextInput>
    <TimeSelect
      v-if="showTimeDropdown"
      @update="sendValue($event), getValue($event)"
      class="timeSelect"
    ></TimeSelect>
    <div class="hintBox" v-if="hint.length > 0">
      <svg-icon icon-class="warn"></svg-icon>
      <h3 class="hint">{{ hint }}</h3>
    </div>
  </div>
</template>

<script>
import TimeSelect from "./TimeSelect.vue";
import TextInput from "../basic/TextInput.vue";
export default {
  name: "UserInfoInputItem",
  components: { TimeSelect, TextInput },
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
    // text,password,birthday
    inputType: {
      type: String,
      default: "text",
    },
  },
  data() {
    return {
      value: null,
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
  font-size: 18px;
  font-weight: 400;
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
  width: 280px;
}
</style>