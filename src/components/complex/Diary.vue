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
      <p>今天我感到开心</p>
      <svg-icon icon-class="happy" class="mood-icon"></svg-icon>
    </div>
    <div class="diary-content">
      We know that many limitations remain as discussed above and we plan to
      make regular model updates to improve in such areas. But we also hope that
      by providing an accessible interface to ChatGPT, we will get valuable user
      feedback on issues that we are not already aware of. Users are encouraged
      to provide feedback on problematic model outputs through the UI, as well
      as on false positives/negatives from the external content filter which is
      also part of the interface. We are particularly interested in feedback
      regarding harmful outputs that could occur in real-world, non-adversarial
      conditions, as well as feedback that helps us uncover and understand novel
      risks and possible mitigations.You can choose to enter the ChatGPT
      Feedback Contest3 for a chance to win up to $500 in API credits.[1] No
      purchase necessary, void where prohibited. Must be at least 18 to enter.
      For contest details, see the Official Rules. Entries can be submitted via
      the feedback form that is linked in the ChatGPT interface. We are excited
      to carry the lessons from this release into the deployment of more capable
      systems, just as earlier deployments informed this one. We know that many
      limitations remain as discussed above and we plan to make regular model
      updates to improve in such areas. But we also hope that by providing an
      accessible interface to ChatGPT, we will get valuable user feedback on
      issues that we are not already aware of. Users are encouraged to provide
      feedback on problematic model outputs through the UI, as well as on false
      positives/negatives from the external content filter which is also part of
      the interface. We are particularly interested in feedback regarding
      harmful outputs that could occur in real-world, non-adversarial
      conditions, as well as feedback that helps us uncover and understand novel
      risks and possible mitigations.You can choose to enter the ChatGPT
      Feedback Contest3 for a chance to win up to $500 in API credits.[1] No
      purchase necessary, void where prohibited. Must be at least 18 to enter.
      For contest details, see the Official Rules. Entries can be submitted via
      the feedback form that is linked in the ChatGPT interface. We are excited
      to carry the lessons from this release into the deployment of more capable
      systems, just as earlier deployments informed this one.
    </div>
  </div>
</template>

<script>
import Avatar from "../basic/Avatar.vue";
import Mood from "../basic/Mood.vue";
import MoreBtn from "../basic/MoreBtn.vue";
export default {
  name: "Diary",
  components: { Avatar, Mood, MoreBtn },
  methods: {
    delDiary() {
      console.log("删除日记");
    },
  },
};
</script>

<style scoped>
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
</style>