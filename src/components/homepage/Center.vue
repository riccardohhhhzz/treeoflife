<template>
  <div id="main-content">
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
  padding: 0px 40px;
  padding-top: 40px;
}
.mydiary {
  width: 100%;
  margin-top: 40px;
}
</style>