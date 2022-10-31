<template>
  <div class="dropdownBox clearfix">
    <svg-icon icon-class="dropdown" class="dropdownIcon"></svg-icon>
    <select>
      <option v-for="(m, index) in arr" :key="index">{{ m }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MyDropdown",
  props: {
    arr: {
      type: Array,
      default: Array.from({ length: 12 }, (v, k) => k + 1),
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
  width: 80px;
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
  width: 80px;
  position: relative;
}
.dropdownIcon {
  position: absolute;
  left: 60%;
  top: 25%;
}
</style>