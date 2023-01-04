<template>
  <div class="my-radio">
    <ul class="wrapper">
      <li v-for="(item, idx) in optionsArr" :key="item">
        <input
          type="radio"
          name="radio-box"
          v-model="radioVal"
          :id="item"
          :value="item"
          @change="changeRadioVal(item)"
        />
        <label :for="item">{{ item }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MyRadio",
  props: {
    optionsArr: {
      type: Array,
    },
    defaultValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      radioVal: this.defaultValue,
    };
  },
  methods: {
    changeRadioVal(val) {
      this.radioVal = val;
      this.$emit("update", val);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  gap: 40px;
  list-style-type: none;
}
.wrapper input[type="radio"] + label {
  margin-left: 10px;
  font-size: 16px;
  color: #333333;
}
</style>