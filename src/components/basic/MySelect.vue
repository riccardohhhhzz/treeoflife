<template>
  <div>
    <div class="selectBox" :style="styleVar">
      <svg-icon icon-class="dropdown" class="dropdownIcon"></svg-icon>
      <select :style="styleVar" v-model="currentValue" @blur="blurEmit">
        <option v-for="(m, index) in arr" :key="index" :value="m">
          {{ m }}
        </option>
      </select>
    </div>
    <h4 class="unit">{{ unit }}</h4>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    arr: {
      type: Array,
    },
    inputType: {
      type: String,
    },
    unit: {
      type: String,
    },
    width: {
      type: String,
      default: "80px",
    },
    // 用于与父组件TimeDropdown通信的回调函数--props通信
    updateValue: {
      type: Function,
    },
    defaultValue: {
      type: String,
      default: null,
    },
  },
  computed: {
    styleVar() {
      return {
        "--width": this.width,
      };
    },
  },
  data() {
    return {
      currentValue: this.defaultValue,
    };
  },
  watch: {
    currentValue: {
      handler(newValue, oldValue) {
        if (this.updateValue) {
          this.updateValue(this.inputType, newValue);
        }
      },
    },
  },
  methods: {
    blurEmit() {
      this.$emit("blur");
      this.$emit("update", this.currentValue);
    },
  },
};
</script>

<style scoped>
select {
  width: var(--width);
  height: 40px;
  border: 1px solid #cdcdcd;
  border-radius: 20px;
  font-size: 16px;
  padding: 0 12px;
  color: #333333;
}
select:hover {
  border-color: #939597;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
select:focus {
  border-color: #5e5e5e;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
.selectBox {
  width: var(--width);
  position: relative;
  display: inline-block;
}
.dropdownIcon {
  position: absolute;
  right: 8px;
  top: 25%;
}
.unit {
  display: inline-block;
  margin-left: 5px;
  color: #333333;
  font-weight: 500;
  font-size: 16px;
}
</style>