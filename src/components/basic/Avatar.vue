<template>
  <div>
    <div class="circle" v-if="username">{{ username[0].toUpperCase() }}</div>
    <div class="user">
      <p class="name">{{ username }}</p>
      <div class="points" v-if="showPoints">
        <svg-icon icon-class="leaf" style="vertical-align: middle"></svg-icon>
        <span class="leavesNum">50</span>
      </div>
      <h5 class="time" v-if="showTime">10月10日</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: ["type", "time"],
  data() {
    return {
      username: "",
    };
  },
  computed: {
    showPoints() {
      return this.type === "topbar";
    },
    showTime() {
      return this.type === "diary";
    },
  },
  mounted() {
    const userInfo = JSON.parse(window.sessionStorage.getItem("user"));
    this.username = userInfo["username"];
  },
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
.time {
  font-size: 12px;
  font-weight: 500;
  color: #cccccc;
  margin-top: 4px;
}
</style>