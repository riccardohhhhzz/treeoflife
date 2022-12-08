<template>
  <div id="diaryDisplayZone">
    <h2 class="title">我的日记</h2>
    <div class="diaries">
      <div class="evenIdx-diaries">
        <Diary
          v-for="(diary, idx) in diaries"
          v-if="idx % 2 === 0"
          :key="diary.time"
          :mood="diary.mood"
          :publishTime="diary.publishTime"
          :content="diary.content"
        ></Diary>
      </div>
      <div class="oddIdx-diaries">
        <Diary
          v-for="(diary, idx) in diaries"
          v-if="idx % 2 === 1"
          :key="diary.time"
          :mood="diary.mood"
          :publishTime="diary.publishTime"
          :content="diary.content"
        ></Diary>
      </div>
    </div>
  </div>
</template>

<script>
import Diary from "./Diary.vue";
export default {
  name: "DiaryDisplayZone",
  components: { Diary },
  data() {
    return {
      diaries: [],
    };
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
</style>