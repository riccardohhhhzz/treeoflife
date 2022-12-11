<template>
  <div id="personal-center">
    <h2 class="personal-info-title">个人信息</h2>
    <div class="personal-info">
      <div class="left-area">
        <AvatarForm></AvatarForm>
      </div>
      <div class="right-area">
        <HobbyForm></HobbyForm>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarForm from "../form/AvatarForm.vue";
import HobbyForm from "../form/HobbyForm.vue";
export default {
  name: "PersonalCenter",
  components: { AvatarForm, HobbyForm },
};
</script>

<style scoped>
.personal-info-title {
  font-size: 24px;
  font-weight: 500;
  color: #333333;
}
.personal-info {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.left-area,
.right-area {
  display: flex;
  flex-direction: column;
  width: 49%;
  row-gap: 24px;
}
</style>