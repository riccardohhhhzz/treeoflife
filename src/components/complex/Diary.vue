<template>
  <div id="diary">
    <div class="diary-top">
      <Avatar type="diary"></Avatar>
      <MoreBtn
        :itemIconList="['delete']"
        :itemTitleList="['删除日记']"
        :clickItemList="[delDiary]"
      ></MoreBtn>
    </div>
    <div class="diary-daily-condition">
      <p v-if="mood != ''">今天我感到{{ this.moodText }}</p>
      <svg-icon :icon-class="mood" class="mood-icon"></svg-icon>
    </div>
    <div class="diary-content" v-if="content != ''" v-html="content"></div>
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
  data() {
    return {
      mood: "",
      content: "",
    };
  },
  computed: {
    moodText() {
      return conditionMap[this.mood];
    },
  },
  methods: {
    showDiary(data) {
      this.mood = data["mood"];
      this.content = data["content"];
    },
    delDiary() {
      console.log("删除日记");
    },
  },
  mounted() {
    this.$bus.$on("publishNewDiary", this.showDiary);
  },
  beforeDestroy() {
    this.$bus.$off("publishNewDiary");
  },
};
</script>

<style>
#diary {
  position: relative;
  display: inline-block;
  width: 45%;
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
.mood-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 4px;
}
.diary-content {
  margin-top: 1rem;
  color: #999999;
}
.diary-content li {
  list-style-position: inside;
}
</style>