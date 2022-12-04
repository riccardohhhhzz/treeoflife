<template>
  <MyForm id="diary-form" v-show="showDiaryForm" ref="form">
    <template slot="title">
      <h2 class="title">发布日记</h2>
    </template>
    <template slot="content">
      <div class="content">
        <SelectMood></SelectMood>
        <QuillEditor></QuillEditor>
      </div>
      <p class="attention">*您的日记仅自己可见</p>
      <MyButton :width="80" :height="40" class="btn-publish" :clickable="false"
        >发布</MyButton
      >
      <MyButton
        :width="80"
        :height="40"
        class="btn-cancel"
        borderColor="#404040"
        bgColor="#fff"
        color="#333333"
        hoverColor="#f7f7f7"
        >取消</MyButton
      >
    </template>
  </MyForm>
</template>

<script>
import MyForm from "../basic/MyForm.vue";
import QuillEditor from "../complex/QuillEditor.vue";
import SelectMood from "../complex/SelectMood.vue";
import MyButton from "../basic/MyButton.vue";
export default {
  name: "DiaryForm",
  components: { MyForm, QuillEditor, SelectMood, MyButton },
  data() {
    return {
      showDiaryForm: false,
    };
  },
  methods: {
    openDiaryForm() {
      this.showDiaryForm = true;
      this.$refs["form"].openDialog();
    },
    closeDiaryForm() {
      this.showDiaryForm = false;
      this.$refs["form"].closeDialog();
    },
  },
  mounted() {
    this.$bus.$on("openDiaryForm", this.openDiaryForm);
  },
};
</script>

<style scoped>
.title {
  font-weight: 500;
  font-size: 22px;
  color: #333;
  margin-top: 20px;
  margin-left: 25px;
}
.content {
  margin: 0px 25px;
  margin-top: 20px;
  border: 1px solid #979797;
  min-height: 200px;
  max-height: 300px;
}
.attention {
  font-size: 14px;
  color: #888888;
  margin: 10px 0px;
  margin-left: 25px;
}
.btn-publish {
  float: right;
  margin-right: 25px;
  margin-bottom: 20px;
}
.btn-cancel {
  float: right;
  margin-right: 10px;
  margin-bottom: 20px;
}
</style>