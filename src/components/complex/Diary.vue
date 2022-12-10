<template>
  <div id="diary">
    <div class="diary-top">
      <Avatar type="diary" :publishTime="diary.publishTime"></Avatar>
      <MoreBtn
        :itemIconList="['delete']"
        :itemTitleList="['删除日记']"
        :clickItemList="[delDiary]"
        ref="moreBtn"
      ></MoreBtn>
    </div>
    <div class="diary-daily-condition">
      <p v-if="diary.mood != ''">今天我感到{{ this.moodText }}</p>
      <svg-icon :icon-class="diary.mood" class="display-mood-icon"></svg-icon>
    </div>
    <div
      class="diary-content"
      v-if="diary.content != ''"
      v-html="diary.content"
    ></div>
  </div>
</template>

<script>
var conditionMap = {
  "very-happy": "愉悦",
  happy: "开心",
  netural: "平静",
  bad: "郁闷",
  "very-bad": "难受",
};
import Avatar from "../basic/Avatar.vue";
import Mood from "../basic/Mood.vue";
import MoreBtn from "../basic/MoreBtn.vue";
export default {
  name: "Diary",
  components: { Avatar, Mood, MoreBtn },
  props: ["diary"],
  computed: {
    moodText() {
      return conditionMap[this.diary.mood];
    },
  },
  methods: {
    delDiary() {
      this.$bus.$emit("deleteDiary", this.diary.id);
      this.$refs["moreBtn"].showContext = false;
    },
  },
};
</script>

<style>
#diary {
  position: relative;
  display: inline-block;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 1rem;
}
.diary-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.diary-daily-condition {
  display: flex;
  align-items: center;
  margin-left: 3.6rem;
  margin-top: 1rem;
}
.display-mood-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 4px;
}
.diary-content {
  margin-top: 1rem;
  color: #999999;
  word-break: break-all;
}
.diary-content li {
  list-style-position: inside;
}
.diary-content img {
  max-width: 100%;
}
</style>