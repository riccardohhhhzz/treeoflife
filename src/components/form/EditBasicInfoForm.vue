<template>
  <MyForm id="edit-basic-info-form" ref="form" minHeight="560px">
    <div class="form-box">
      <h2 class="title">基本信息</h2>
      <div class="edit-info">
        <UserInfoInputItem
          v-for="(item, idx) in inputItemList"
          :key="item.title"
          :title="item.title"
          :inputType="item.inputType"
          :optionsArr="item.optionsArr"
          titleFontWeight="600"
          titleFontSize="16px"
          inputBgColor="#fff"
          birthdayYearWidth="170px"
          birthdayMonthWidth="170px"
          birthdayDayWidth="170px"
          :defaultObjectValue="
            typeof item.value === 'object' ? item.value : null
          "
          :defaultStringValue="
            typeof item.value === 'string' ? item.value : null
          "
        ></UserInfoInputItem>
      </div>
      <MyButton :fontSize="16" :width="90" :height="40" class="save-btn"
        >保存</MyButton
      >
    </div>
  </MyForm>
</template>

<script>
import MyForm from "../basic/MyForm.vue";
import MyButton from "../basic/MyButton.vue";
import UserInfoInputItem from "../complex/UserInfoInputItem.vue";
export default {
  name: "EditBasicInfoForm",
  components: { MyForm, MyButton, UserInfoInputItem },
  data() {
    return {
      inputItemList: [
        {
          title: "昵称",
          inputType: "text",
          optionsArr: null,
          value: this.$store.state.userAbout.userInfo.username,
        },
        {
          title: "性别",
          inputType: "radio",
          optionsArr: ["女", "男"],
          value: this.$store.getters["userAbout/sex"],
        },
        {
          title: "生日",
          inputType: "birthday",
          optionsArr: null,
          value: this.$store.state.userAbout.userInfo.birthday,
        },
        {
          title: "身高(cm)",
          inputType: "text",
          optionsArr: null,
          value:
            this.$store.state.userAbout.userInfo.height === 0
              ? null
              : this.$store.state.userAbout.userInfo.height.toString(),
        },
        {
          title: "体重(kg)",
          inputType: "text",
          optionsArr: null,
          value:
            this.$store.state.userAbout.userInfo.weight === 0
              ? null
              : this.$store.state.userAbout.userInfo.weight.toString(),
        },
      ],
    };
  },
  methods: {
    openEditBasicInfoForm() {
      this.$refs["form"].openForm();
    },
    closeEditBasicInfoForm() {
      this.$refs["form"].closeForm();
    },
  },
  mounted() {
    this.$bus.$on("openEditBasicInfoForm", this.openEditBasicInfoForm);
  },
  beforeDestroy() {
    this.$bus.$off("openEditBasicInfoForm");
  },
};
</script>

<style scoped>
.form-box {
  margin: 20px 25px;
}
.title {
  font-weight: 500;
  font-size: 24px;
  color: #333;
}
.edit-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.save-btn {
  margin-top: 15px;
}
</style>