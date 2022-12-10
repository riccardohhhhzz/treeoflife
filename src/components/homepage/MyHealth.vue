<template>
  <div id="myhealth">
    <div class="first-line">
      <ConditionCurve class="condition-curve"></ConditionCurve>
      <div class="complete-profile">
        <h4 class="title">完善个人资料</h4>
        <p class="content">
          你分享的内容越多,<br />你得到的就越多。内容和联系<br />变得更加个性化和强大。
        </p>
        <MyButton class="btn">完善我的资料</MyButton>
      </div>
    </div>
    <DiaryDisplayZone class="mydiary"></DiaryDisplayZone>
  </div>
</template>

<script>
import ConditionCurve from "../complex/ConditionCurve.vue";
import DiaryDisplayZone from "../complex/DiaryDisplayZone.vue";
import MyButton from "../basic/MyButton.vue";
export default {
  name: "MyHealth",
  components: { ConditionCurve, DiaryDisplayZone, MyButton },
};
</script>

<style scoped>
.first-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.condition-curve {
  width: 65%;
}
.complete-profile {
  width: 25%;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 30px 10px;
  text-align: center;
}
.complete-profile .title {
  color: #666666;
  font-weight: 500;
  font-size: 24px;
}
.complete-profile .content {
  color: #999999;
  font-size: 18px;
  margin: 20px 0;
}
.mydiary {
  width: 100%;
  margin-top: 40px;
}
</style>