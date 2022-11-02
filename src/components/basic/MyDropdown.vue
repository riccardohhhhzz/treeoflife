<template>
  <div>
    <div class="dropdownBox" :style="styleVar">
      <svg-icon icon-class="dropdown" class="dropdownIcon"></svg-icon>
      <select :style="styleVar" v-model="currentValue">
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
  name: "MyDropdown",
  props: {
    arr: {
      type: Array,
    },
    inputType: {
      inputType: String,
    },
    unit: {
      type: String,
    },
    width: {
      type: Number,
      default: 80,
    },
    // 用于与父组件TimeDropdown通信的回调函数--props通信
    updateValue: {
      type: Function,
    },
  },
  computed: {
    styleVar() {
      return {
        "--width": this.width.toString() + "px",
      };
    },
  },
  data() {
    return {
      currentValue: null,
    };
  },
  watch: {
    currentValue: {
      handler(newValue, oldValue) {
        this.updateValue(this.inputType, newValue);
      },
    },
  },
};
</script>

<style scoped>
select {
  /*将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
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
.dropdownBox {
  width: var(--width);
  position: relative;
  display: inline-block;
}
.dropdownIcon {
  position: absolute;
  left: 65%;
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