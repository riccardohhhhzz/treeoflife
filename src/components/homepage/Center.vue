<template>
  <div id="main-content">
    <ConditionCurve></ConditionCurve>
  </div>
</template>

<script>
import ConditionCurve from "../complex/ConditionCurve.vue";
export default {
  name: "Center",
  components: { ConditionCurve },
};
</script>

<style>
#main-content {
  margin: 0rem 15rem;
  padding: 0px 40px;
  padding-top: 40px;
}
</style>