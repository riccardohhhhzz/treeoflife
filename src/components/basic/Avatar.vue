<template>
  <div>
    <div class="circle" v-if="username">{{ username[0].toUpperCase() }}</div>
    <div class="user">
      <p class="name">{{ username }}</p>
      <div class="points" v-if="showPoints">
        <svg-icon icon-class="leaf" style="vertical-align: middle"></svg-icon>
        <span class="leavesNum">50</span>
      </div>
      <h5 class="time" v-if="showTime">{{ renderTime }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    type: {
      type: String,
    },
    publishTime: {
      type: Number,
    },
  },
  data() {
    return {
      username: "",
    };
  },
  computed: {
    /*
    按照以下规则，渲染发布时间:
      如果不满一分钟的，用【刚刚】表示
      如果不满一小时的，用【x分钟前】表示
      如果不满一天的，用【x小时前】表示
      如果是间隔两天的，用【昨天】【前天】表示
      如果是一年以内的，用【月-日】表示
      如果是超过一年的，用【年-月-日】表示
    */
    renderTime() {
      var myDate = new Date();
      var curTime = myDate.getTime();
      var curYear = myDate.getFullYear();
      var interval = curTime - this.publishTime;
      // 不满一分钟
      if (interval < 1000 * 60) {
        return "刚刚";
      }
      // 不满一小时
      if (interval < 1000 * 60 * 60) {
        let minutes = Math.floor(interval / (1000 * 60)).toString();
        return minutes + "分钟前";
      }
      // 不满一天
      if (interval < 1000 * 60 * 60 * 24) {
        let hours = Math.floor(interval / (1000 * 60 * 60)).toString();
        return hours + "小时前";
      }
      // 不满48小时
      if (interval < 1000 * 60 * 60 * 24 * 2) {
        return "昨天";
      }
      // 不满72小时
      if (interval < 1000 * 60 * 60 * 24 * 3) {
        return "前天";
      }
      var publishDate = myDate.setTime(this.publishTime);
      var publishYear = publishDate.getFullYear();
      var publishMonth = publishDate.getMonth() + 1;
      var publishDay = publishDate.getDate();
      // 如果是今年的
      if (publishYear === curYear) {
        return publishMonth + "-" + publishDay;
      } else {
        return publishYear + "-" + publishMonth + "-" + publishDay;
      }
    },
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