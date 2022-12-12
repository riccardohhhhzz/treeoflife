<template>
  <InfoForm title="基本信息" :showEditBtn="true">
    <div class="edit-basic-info">
      <InfoItem
        v-for="(item, idx) in properties"
        :key="item.name"
        :propertyName="item.name"
        :propertyValue="item.value"
      ></InfoItem>
    </div>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import InfoItem from "../basic/InfoItem.vue";
export default {
  name: "BasicInfoForm",
  components: { InfoForm, InfoItem },
  data() {
    return {
      properties: [
        { name: "昵称", value: this.$store.state.userAbout.userInfo.username },
        { name: "性别", value: null },
        { name: "生日", value: this.$store.getters["userAbout/birthday"] },
        { name: "身高", value: null },
        { name: "体重", value: null },
      ],
    };
  },
};
</script>

<style scoped>
.edit-basic-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>