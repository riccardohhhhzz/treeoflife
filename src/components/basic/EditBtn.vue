<template>
  <div id="edit-btn">
    <svg-icon icon-class="edit" class="icon"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "EditBtn",
};
</script>

<style scoped>
#edit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #999999;
}
#edit-btn:hover {
  background-color: #e6e6e6;
  cursor: pointer;
}
.icon {
  width: 24px;
  height: 24px;
}
</style>