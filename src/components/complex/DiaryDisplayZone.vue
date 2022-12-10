<template>
  <div id="diaryDisplayZone">
    <h2 class="title">我的日记</h2>
    <div class="diaries" v-if="diaries.length != 0">
      <transition-group
        appear
        name="scale-in"
        tag="div"
        class="evenIdx-diaries"
      >
        <Diary
          v-for="(diary, idx) in evenIdxDiaries"
          :key="diary.id"
          :diary="diary"
        ></Diary>
      </transition-group>
      <transition-group appear name="scale-in" tag="div" class="oddIdx-diaries">
        <Diary
          v-for="(diary, idx) in oddIdxDiaries"
          :key="diary.id"
          :diary="diary"
        ></Diary>
      </transition-group>
    </div>
    <div class="placeholder" v-if="diaries.length === 0">
      <svg-icon
        icon-class="diary-placeholder"
        class="placeholder-icon"
      ></svg-icon>
      <p class="placeholder-text">没有发现日记记录</p>
      <MyButton class="placeholder-btn" @click.native="openDiaryForm"
        >创建新的日记</MyButton
      >
    </div>
  </div>
</template>

<script>
import Diary from "./Diary.vue";
import MyButton from "../basic/MyButton.vue";
import axios from "axios";
export default {
  name: "DiaryDisplayZone",
  components: { Diary, MyButton },
  data() {
    return {
      diaries: [],
    };
  },
  computed: {
    evenIdxDiaries() {
      return this.diaries.filter(function (diary, idx) {
        return idx % 2 === 0;
      });
    },
    oddIdxDiaries() {
      return this.diaries.filter(function (diary, idx) {
        return idx % 2 === 1;
      });
    },
  },
  methods: {
    addNewDiary(data) {
      this.diaries.unshift({
        id: data.id,
        mood: data.emotion,
        publishTime: this.timeToNumber(data.createdTime),
        content: data.content,
      });
    },
    delDiary(id) {
      axios({
        url: "/diary/delete",
        headers: { "Content-Type": "application/json" },
        method: "post",
        params: {
          username: this.$store.state.userAbout.userInfo.username,
          id: id,
        },
      }).then((res) => {
        var data = res.data;
        if (data.state === 200) {
          this.diaries = this.diaries.filter(function (diary, idx) {
            return diary.id != id;
          });
        } else {
          alert("操作失败，请重试");
        }
      });
    },
    openDiaryForm() {
      this.$bus.$emit("openDiaryForm");
    },
    // 将后端传来的时间转化为Number，形如：2022-12-09 21:59:32
    timeToNumber(time) {
      var yearMonthDate = time.split(" ")[0];
      var hourMinSec = time.split(" ")[1];
      var year = Number(yearMonthDate.split("-")[0]);
      var month = Number(yearMonthDate.split("-")[1]) - 1;
      var date = Number(yearMonthDate.split("-")[2]);
      var hour = Number(hourMinSec.split(":")[0]);
      var minute = Number(hourMinSec.split(":")[1]);
      var second = Number(hourMinSec.split(":")[2]);
      var myDate = new Date(year, month, date, hour, minute, second);
      return myDate.getTime();
    },
  },
  mounted() {
    this.$bus.$on("publishNewDiary", this.addNewDiary);
    this.$bus.$on("deleteDiary", this.delDiary);
    axios({
      url: "/diary/select",
      headers: { "Content-Type": "application/json" },
      method: "post",
      params: {
        username: this.$store.state.userAbout.userInfo.username,
        days: 365,
      },
    }).then((res) => {
      var data = res.data;
      if (data.state === 200) {
        this.diaries = data.data.map((item, idx) => {
          return {
            id: item.id,
            mood: item.emotion,
            publishTime: this.timeToNumber(item.createdTime),
            content: item.content,
          };
        });
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("publishNewDiary");
    this.$bus.$off("deleteDiary");
  },
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
}
.diaries {
  display: flex;
  justify-content: space-between;
}
.evenIdx-diaries,
.oddIdx-diaries {
  display: flex;
  margin-top: 30px;
  flex-direction: column;
  width: 49%;
  row-gap: 24px;
}
.placeholder {
  position: relative;
}
.placeholder-icon {
  position: absolute;
  left: 0;
  right: 0;
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
}
.placeholder-text {
  position: absolute;
  left: 0;
  right: 0;
  top: 16rem;
  width: fit-content;
  margin: 0 auto;
  color: #999999;
}
.placeholder-btn {
  position: absolute;
  left: 0;
  right: 0;
  top: 18rem;
  margin: 0 auto;
}
.scale-in-enter,
.scale-in-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scale-in-leave,
.scale-in-enter-to {
  transform: scale(1);
  opacity: 1;
}
.scale-in-enter-active {
  transition: all 0.6s ease;
}
</style>