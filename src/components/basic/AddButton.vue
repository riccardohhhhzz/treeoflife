<template>
  <div id="add-button">
    <div class="add-circle">
      <svg-icon icon-class="plus" class="plus-icon"></svg-icon>
    </div>
    <h4 class="hint">新增</h4>
  </div>
</template>

<script>
export default {
  name: "AddButton",
};
</script>

<style scoped>
#add-button {
  text-align: center;
}
.add-circle {
  width: 24px;
  height: 24px;
  background-color: #4dcf90;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.add-circle:hover {
  background-color: #59d79a;
  cursor: pointer;
}
.plus-icon {
  width: 20px;
  height: 20px;
}
.hint {
  font-weight: 500;
  font-size: 14px;
  color: #666666;
}
</style>