<template>
  <div>
    <div class="circle" v-if="username" :style="styleVar">
      {{ username[0].toUpperCase() }}
    </div>
    <div class="user">
      <p class="name" v-if="type != 'info'">{{ username }}</p>
      <div class="points" v-if="showPoints">
        <svg-icon icon-class="leaf" style="vertical-align: middle"></svg-icon>
        <span class="leavesNum">{{ credit }}</span>
      </div>
      <h5 class="time" v-if="showTime">{{ renderTime }}</h5>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Avatar",
  props: {
    type: {
      type: String,
    },
    publishTime: {
      type: Number,
    },
    avatarWidth: {
      type: String,
      default: "3rem",
    },
    fontSize: {
      type: String,
      default: "24px",
    },
  },
  data() {
    return {
      username: this.$store.state.userAbout.userInfo.username,
      credit: this.$store.state.userAbout.userInfo.credit,
    };
  },
  computed: {
    styleVar() {
      return {
        "--avatarWidth": this.avatarWidth,
        "--fontSize": this.fontSize,
      };
    },
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
      var today = new Date();
      var curTime = today.getTime();
      var curYear = today.getFullYear();
      var publishDay = new Date(this.publishTime);
      var publishYear = publishDay.getFullYear();
      var publishMonth = publishDay.getMonth() + 1;
      var publishDate = publishDay.getDate();
      var interval = curTime - this.publishTime;
      var yesterday = new Date(curTime - 1000 * 60 * 60 * 24).getDate();
      var beforeYesterday = new Date(
        curTime - 1000 * 60 * 60 * 24 * 2
      ).getDate();
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
      // 昨天
      if (publishDate === yesterday) {
        return "昨天";
      }
      // 前天
      if (publishDate === beforeYesterday) {
        return "前天";
      }
      // 如果是今年的
      if (publishYear === curYear) {
        return publishMonth + "-" + publishDate;
      } else {
        return publishYear + "-" + publishMonth + "-" + publishDate;
      }
    },
    showPoints() {
      return this.type === "topbar";
    },
    showTime() {
      return this.type === "diary";
    },
    onlyShowAvatar() {
      return this.type === "info";
    },
  },
};
</script>

<style scoped>
.circle {
  float: left;
  display: flex;
  height: var(--avatarWidth);
  width: var(--avatarWidth);
  background-color: #4dcf90;
  border-radius: var(--avatarWidth);
  color: #fff;
  font-size: var(--fontSize);
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