<template>
  <MyForm id="edit-location-form" ref="form" minHeight="300px">
    <div class="form-box">
      <h2 class="title">位置</h2>
      <div class="edit-info">
        <UserInfoInputItem
          ref="user-info-input"
          v-for="(item, idx) in inputItemList"
          :key="item.title"
          :title="item.title"
          :inputType="item.inputType"
          :optionsArr="item.optionsArr"
          titleFontWeight="600"
          titleFontSize="16px"
          inputBgColor="#fff"
        ></UserInfoInputItem>
      </div>
      <MyButton
        :fontSize="16"
        :width="90"
        :height="40"
        class="save-btn"
        @click.native="saveLocation"
        >保存</MyButton
      >
    </div>
  </MyForm>
</template>

<script>
const ChineseProvinces = [
  "北京市",
  "天津市",
  "上海市",
  "重庆市",
  "河北省",
  "山西省",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "海南省",
  "四川省",
  "贵州省",
  "云南省",
  "陕西省",
  "甘肃省",
  "青海省",
  "台湾省",
  "内蒙古自治区",
  "广西壮族自治区",
  "西藏自治区",
  "宁夏回族自治区",
  "新疆维吾尔自治区",
  "香港特别行政区",
  "澳门特别行政区",
];
import MyForm from "../basic/MyForm.vue";
import MyButton from "../basic/MyButton.vue";
import UserInfoInputItem from "../complex/UserInfoInputItem.vue";
export default {
  name: "EditLocationForm",
  components: { MyForm, MyButton, UserInfoInputItem },
  data() {
    return {
      inputItemList: [
        { title: "国家", inputType: "dropdown", optionsArr: ["中国"] },
        {
          title: "地区/省份",
          inputType: "dropdown",
          optionsArr: ChineseProvinces,
        },
        { title: "城市（选填）", inputType: "text", optionsArr: null },
        { title: "地区（选填）", inputType: "text", optionsArr: null },
      ],
    };
  },
  methods: {
    openEditLocationForm() {
      this.$refs["form"].openForm();
    },
    closeEditLocationForm() {
      this.$refs["form"].closeForm();
    },
    saveLocation() {
      console.log(this.$refs["user-info-input"]);
    },
  },
  mounted() {
    this.$bus.$on("openEditLocationForm", this.openEditLocationForm);
  },
  beforeDestroy() {
    this.$bus.$off("openEditLocationForm");
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
  display: grid;
  grid-template-columns: repeat(2, 45%);
  column-gap: 10%;
  margin-top: 20px;
}
.save-btn {
  margin-top: 15px;
}
</style>