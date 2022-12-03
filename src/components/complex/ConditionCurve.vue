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
            v-show="showMoodIcon"
            :style="{ top: topOfMood[mood] }"
          ></Mood>
        </li>
      </transition-group>
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
export default {
  name: "ConditionCurve",
  components: { Mood },
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
  methods: {
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
    calLineAngleAndWidth(curMood, nextMood) {
      // 根据当前的宽高以及起始心情类别计算线的角度以及长度
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
  created() {
    this.daylist = this.getDaylist(this.pastDaysNum);
    this.pastMoods = Array.from(
      { length: this.pastDaysNum },
      (v) => this.moodType[Math.floor(Math.random() * this.moodType.length)]
    );
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
    this.showRectangle = true;
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
  width: 65%;
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
  width: 65%;
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