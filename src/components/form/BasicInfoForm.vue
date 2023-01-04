<template>
  <InfoForm
    title="基本信息"
    :showEditBtn="true"
    @clickEditBtn="openEditBasicInfoForm"
  >
    <div class="edit-basic-info">
      <InfoItem
        v-for="(item, idx) in properties"
        :key="item.name"
        :propertyName="item.name"
        :propertyValue="item.value"
        @clickAdd="openEditBasicInfoForm"
      ></InfoItem>
    </div>
    <EditBasicInfoForm></EditBasicInfoForm>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import InfoItem from "../basic/InfoItem.vue";
import EditBasicInfoForm from "./EditBasicInfoForm.vue";
export default {
  name: "BasicInfoForm",
  components: { InfoForm, InfoItem, EditBasicInfoForm },
  data() {
    return {
      properties: [
        { name: "昵称", value: this.$store.state.userAbout.userInfo.username },
        { name: "性别", value: this.$store.state.userAbout.userInfo.gender },
        { name: "生日", value: this.$store.getters["userAbout/birthday"] },
        {
          name: "身高",
          value:
            this.$store.state.userAbout.userInfo.height === 0
              ? null
              : this.$store.state.userAbout.userInfo.height.toString() + " cm",
        },
        {
          name: "体重",
          value:
            this.$store.state.userAbout.userInfo.weight === 0
              ? null
              : this.$store.state.userAbout.userInfo.weight.toString() + " kg",
        },
      ],
    };
  },
  methods: {
    openEditBasicInfoForm() {
      this.$bus.$emit("openEditBasicInfoForm");
    },
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