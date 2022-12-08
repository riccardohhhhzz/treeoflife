<template>
  <div id="diaryDisplayZone">
    <h2 class="title">我的日记</h2>
    <div class="diaries" v-if="diaries.length != 0">
      <transition-group appear name="list" tag="div" class="evenIdx-diaries">
        <Diary
          v-for="(diary, idx) in evenIdxDiaries"
          :key="diary.publishTime"
          :mood="diary.mood"
          :publishTime="diary.publishTime"
          :content="diary.content"
        ></Diary>
      </transition-group>
      <transition-group name="list" tag="div" class="oddIdx-diaries">
        <Diary
          v-for="(diary, idx) in oddIdxDiaries"
          :key="diary.publishTime"
          :mood="diary.mood"
          :publishTime="diary.publishTime"
          :content="diary.content"
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
      // data: {mood:xxx,publishTime:xxx,content:xxx}
      this.diaries.unshift(data);
    },
    delDiary(id) {
      this.diaries = this.diaries.filter(function (diary, idx) {
        return diary.publishTime != id;
      });
    },
    openDiaryForm() {
      this.$bus.$emit("openDiaryForm");
    },
  },
  mounted() {
    this.$bus.$on("publishNewDiary", this.addNewDiary);
    this.$bus.$on("deleteDiary", this.delDiary);
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
.list-enter,
.list-leave-to {
  transform: scale(0);
  opacity: 0;
}
.list-leave,
.list-enter-to {
  transform: scale(1);
  opacity: 1;
}
.list-enter-active {
  transition: all 0.6s ease;
}
</style>