<template>
  <div id="main-content">
    <div class="topbar-area"></div>
    <ConditionCurve></ConditionCurve>
    <DiaryDisplayZone class="mydiary"></DiaryDisplayZone>
  </div>
</template>

<script>
import ConditionCurve from "../complex/ConditionCurve.vue";
import DiaryDisplayZone from "../complex/DiaryDisplayZone.vue";
export default {
  name: "Center",
  components: { ConditionCurve, DiaryDisplayZone },
};
</script>

<style scoped>
#main-content {
  margin: 0rem 15rem;
  padding: 40px;
}
.topbar-area {
  height: 4.8rem;
}
.mydiary {
  width: 100%;
  margin-top: 40px;
}
</style>