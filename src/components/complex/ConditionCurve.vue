<template>
  <div id="condition-curve">
    <h2 class="condition-title">每日状态</h2>
    <div class="condition-table">
      <div class="horizontal-lines">
        <div v-for="idx in Array(4)" class="horizontal-line"></div>
      </div>
      <div class="vertical-line"></div>
      <transition-group
        name="line"
        tag="ul"
        class="graph"
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
      >
        <li
          v-for="(mood, idx) in this.pastMoods"
          :key="idx + 1"
          :data-index="idx"
          v-show="showRectangle"
          class="mood-rectangle"
          id="rectangle"
        >
          <div
            class="mood-line"
            :style="{
              top: topOfLine[mood],
              width: enterAnimationFinished
                ? lineAngleAndWidth[idx].width
                : null,
              transform: 'rotate(' + lineAngleAndWidth[idx].angle + ')',
            }"
          ></div>
          <Mood
            class="mood-icon"
            :type="mood"
            :date="datelist[idx]"
            v-show="showMoodIcon"
            :style="{ top: topOfMood[mood] }"
          ></Mood>
        </li>
      </transition-group>
      <div class="add">
        <AddButton @click.native="openDiaryForm"></AddButton>
      </div>
    </div>
    <div class="days">
      <span class="past-days">
        <h3 v-for="day in daylist" class="past-day">{{ day }}</h3>
      </span>
      <h3 class="today">今天</h3>
    </div>
  </div>
</template>

<script>
import Mood from "../basic/Mood.vue";
import Velocity from "velocity-animate";
import AddButton from "../basic/AddButton.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "ConditionCurve",
  components: { Mood, AddButton },
  data() {
    return {
      moodType: [
        "very-happy",
        "happy",
        "netural",
        "bad",
        "very-bad",
        "default",
      ],
      moodHeight: {
        "very-happy": 4,
        happy: 3,
        netural: 2,
        bad: 1,
        "very-bad": 0,
        default: 2,
      },
      day: ["日", "一", "二", "三", "四", "五", "六"],
      topOfMood: {
        "very-happy": "calc(20% - 0.7rem)",
        happy: "calc(40% - 0.7rem)",
        netural: "calc(60% - 0.7rem)",
        bad: "calc(80% - 0.7rem)",
        "very-bad": "calc(100% - 0.7rem)",
        default: "calc(60% - 10px)",
      },
      topOfLine: {
        "very-happy": "calc(20%)",
        happy: "calc(40%)",
        netural: "calc(60%)",
        bad: "calc(80%)",
        "very-bad": "calc(100%)",
        default: "calc(60%)",
      },
      pastDaysNum: 8,
      screenWidth: null,
      showRectangle: false,
      showMoodIcon: false,
      enterAnimationFinished: false,
    };
  },
  watch: {
    screenWidth: {
      handler: function (width) {
        // updateLineAngleAndWidth依赖下一次DOM更新后的信息，
        // 因此需要采用nextTick。
        this.$nextTick(this.updateLineAngleAndWidth);
      },
    },
  },
  computed: {
    ...mapState("diaryAbout", { pastMoods: "pastDaysCondition" }),
  },
  methods: {
    ...mapActions("diaryAbout", { initCondition: "initPastDaysCondition" }),
    getPastMoods() {
      axios({
        url: "/diary/selectEmotion",
        headers: { "Content-Type": "application/json" },
        method: "post",
        params: {
          username: this.$store.state.userAbout.userInfo.username,
          days: this.pastDaysNum,
        },
      }).then((res) => {
        var data = res.data;
        if (data.state === 200) {
          this.initCondition(data.data);
          this.$nextTick(this.updateTodayMood);
        }
      });
    },
    updateTodayMood() {
      this.updateLineAngleAndWidth();
    },
    openDiaryForm() {
      this.$bus.$emit("openDiaryForm");
    },
    // 计算出过去days天的星期
    getDaylist(days) {
      var pastDays = [];
      var myDate = new Date();
      let today = myDate.getDay();
      for (var i = 0; i < days; i++) {
        let dayIdx = today - i;
        if (dayIdx >= 0) {
          pastDays.unshift(this.day[dayIdx]);
        } else {
          let mode = Math.abs(dayIdx) % 7;
          if (mode == 0) {
            pastDays.unshift(
              this.day[Math.floor(Math.abs(dayIdx) / 7) * 7 + dayIdx]
            );
          } else {
            pastDays.unshift(
              this.day[Math.floor(Math.abs(dayIdx) / 7) * 7 + dayIdx + 7]
            );
          }
        }
      }
      return pastDays;
    },
    // 计算出过去days天的日期，形式为 "月/日，年"
    getDateList(days) {
      var pastDates = [];
      for (var day = 0; day < days; day++) {
        var today = new Date();
        var lastDate = today.getTime() - 1000 * 60 * 60 * 24 * day;
        today.setTime(lastDate);
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;
        pastDates.unshift(month + "/" + date + "," + year);
      }
      return pastDates;
    },
    // 根据当前的宽高以及起始心情类别计算线的角度以及长度
    calLineAngleAndWidth(curMood, nextMood) {
      let rec = document.getElementById("rectangle");
      let unitWidth = rec.offsetWidth;
      let unitHeight = rec.offsetHeight / 5;
      let diffHeight =
        (this.moodHeight[curMood] - this.moodHeight[nextMood]) * unitHeight;
      let lineAngle = Math.atan(diffHeight / unitWidth);
      let lineWidth = unitWidth / Math.cos(Math.abs(lineAngle));
      return {
        angle: lineAngle * (180 / Math.PI) + "deg",
        width: lineWidth + "px",
      };
    },
    updateLineAngleAndWidth() {
      if (this.pastMoods === null) {
        return;
      }
      this.lineAngleAndWidth = Array.from(
        { length: this.pastDaysNum - 1 },
        (v, k) => {
          return this.calLineAngleAndWidth(
            this.pastMoods[k],
            this.pastMoods[k + 1]
          );
        }
      );
      this.lineAngleAndWidth.push({ angle: null, width: "0px" });
      // 强制重新渲染组件
      this.$forceUpdate();
    },
    handleBeforeEnter: function (el) {
      el.firstChild.style.width = 0;
    },
    handleEnter: function (el, done) {
      var idx = Number(el.dataset.index);
      var delay = idx * 300;
      setTimeout(() => {
        Velocity(
          el.firstChild,
          {
            width: this.lineAngleAndWidth[idx].width,
          },
          {
            duration: 300,
            easing: "linear",
            complete: done,
          }
        );
      }, delay);
    },
    handleAfterEnter: function (el, done) {
      if (Number(el.dataset.index) === this.pastDaysNum - 1) {
        this.showMoodIcon = true;
        this.enterAnimationFinished = true;
      }
    },
  },
  beforeMount() {
    // pastMoods以及lineAngleAndWidth都没有放在data中，可以选择在beforeMount时进行声明，
    // 此时并没有将编译好的HTML挂载到el所指的DOM上
    this.daylist = this.getDaylist(this.pastDaysNum);
    this.datelist = this.getDateList(this.pastDaysNum);
    this.lineAngleAndWidth = Array.from({ length: this.pastDaysNum }, (v) => {
      return { angle: "0deg", width: "0px" };
    });
  },
  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
      })();
    };
    this.getPastMoods();
    this.showRectangle = true; //进场动画触发
    this.$bus.$on("conditionsUpdated", this.updateTodayMood);
    this.$bus.$on("getPastMoods", this.getPastMoods);
  },
  beforeDestroy() {
    this.$bus.$off("conditionUpdated");
    this.$bus.$off("getPastMoods");
  },
};
</script>

<style scoped>
.condition-title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
}
.condition-table {
  position: relative;
  width: 100%;
  height: 200px;
  border-left: 2px solid #333333;
  border-bottom: 2px solid #333333;
  margin-top: 30px;
}
.horizontal-lines {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.horizontal-line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #cccccc;
}
.vertical-line {
  position: absolute;
  top: 0;
  right: 15%;
  height: 100%;
  width: 1px;
  border-right: 1px solid #bebebe;
}
.graph {
  position: absolute;
  display: flex;
  justify-content: space-around;
  top: 0;
  left: 0;
  width: 85%;
  height: 100%;
}
.add {
  position: absolute;
  top: 50%;
  right: 0;
  width: 15%;
}
.mood-rectangle {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}
.mood-icon {
  position: absolute;
}
.mood-line {
  position: absolute;
  left: 50%;
  height: 0px;
  border-bottom: 1.5px solid #333333;
  /* 顺时针为正，逆时针为负 */
  /* transform: rotate(45deg); */
  /* 默认旋转中心是正中心 */
  transform-origin: left top;
}
.days {
  width: 100%;
  margin-top: 10px;
  margin-left: 2px;
  display: flex;
}
.past-days {
  width: 85%;
  display: flex;
  justify-content: space-around;
}
.past-days .past-day {
  float: left;
  color: #333333;
  font-weight: 500;
  font-size: 18px;
}
.today {
  width: 15%;
  color: #333333;
  font-weight: 500;
  float: left;
  font-size: 18px;
  text-align: center;
}
</style>