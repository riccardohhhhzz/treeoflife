<template>
  <div id="diaryDisplayZone">
    <h2 class="title">我的日记</h2>
    <div class="diaries">
      <Diary></Diary>
    </div>
  </div>
</template>

<script>
import Diary from "./Diary.vue";
export default {
  name: "DiaryDisplayZone",
  components: { Diary },
};
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
}
.diaries {
  margin-top: 30px;
}
</style>