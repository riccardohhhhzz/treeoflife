<template>
  <div>
    <div class="circle">R</div>
    <div class="user">
      <p class="name">Riccardo</p>
      <div class="points">
        <svg-icon icon-class="leaf" style="vertical-align: middle"></svg-icon>
        <span class="leavesNum">50</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
};
</script>

<style scoped>
.circle {
  float: left;
  display: flex;
  height: 3rem;
  width: 3rem;
  background-color: #4dcf90;
  border-radius: 1.5rem;
  color: #fff;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  cursor: default;
}
.user {
  float: left;
  margin-left: 0.6rem;
  margin-top: 0.2rem;
  cursor: default;
}
.name {
  color: #333333;
}
.leavesNum {
  font-size: 12px;
  color: #666666;
  vertical-align: middle;
  margin-left: 0.5em;
}
</style>