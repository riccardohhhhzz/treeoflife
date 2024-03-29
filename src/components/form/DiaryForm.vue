<template>
  <MyForm id="diary-form" ref="form" :key="componentKey">
    <h2 class="title">发布日记</h2>
    <div class="content">
      <SelectMood ref="mood-select"></SelectMood>
      <QuillEditor ref="quill-editor"></QuillEditor>
    </div>
    <p class="attention">*您的日记仅自己可见</p>
    <MyButton
      :width="80"
      :height="40"
      class="btn-publish"
      :clickable="publishable"
      @click.native="publishDiary"
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
      @click.native="closeDiaryForm"
      >取消</MyButton
    >
  </MyForm>
</template>

<script>
import MyForm from "../basic/MyForm.vue";
import QuillEditor from "../complex/QuillEditor.vue";
import SelectMood from "../complex/SelectMood.vue";
import MyButton from "../basic/MyButton.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "DiaryForm",
  components: { MyForm, QuillEditor, SelectMood, MyButton },
  data() {
    return {
      publishable: false,
      selectedMood: "default",
      componentKey: 0,
    };
  },
  methods: {
    ...mapActions("diaryAbout", ["updateCondition"]),
    publishDiary() {
      if (!this.publishable) {
        const dialogOptions = {
          title: "提示",
          content: "请选择今日状态",
          mainBtnContent: "确认",
          showSecondaryBtn: false,
          mainBtnClickHandler: () => {},
        };
        this.$bus.$emit("openDialog", dialogOptions);
        return;
      }
      let myDate = new Date();
      let diary = {
        mood: this.selectedMood,
        publishTime: myDate.getTime(),
        content: this.$refs["quill-editor"].content,
      };
      axios({
        url: "/diary/add",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: this.$store.state.userAbout.userInfo.username,
          emotion: diary.mood,
          content: diary.content,
        },
      })
        .then((res) => {
          const data = res.data;
          if (data.state === 200) {
            this.updateCondition(this.selectedMood);
            this.$bus.$emit("conditionsUpdated");
            this.$bus.$emit("publishNewDiary", data.data);
            this.$bus.$emit("finishTask", "日记记录");
            this.clearCondition();
          }
        })
        .catch((e) => {
          const dialogOptions = {
            title: "提示",
            content: "发布失败！",
            mainBtnContent: "重试",
            secondaryBtnContent: "取消",
            showSecondaryBtn: true,
            mainBtnClickHandler: this.publishDiary,
            secondaryBtnClickHandler: () => {},
          };
          this.$bus.$emit("openDialog", dialogOptions);
        });
    },
    updateSelectedMood(data) {
      this.selectedMood = data;
      this.publishable = true;
    },
    openDiaryForm() {
      this.$refs["form"].openForm();
    },
    closeDiaryForm() {
      this.$refs["form"].closeForm();
    },
    clearCondition() {
      this.componentKey += 1;
      this.publishable = false;
    },
  },
  mounted() {
    this.$bus.$on("openDiaryForm", this.openDiaryForm);
    this.$bus.$on("selectMood", this.updateSelectedMood);
  },
  beforeDestroy() {
    this.$bus.$off("openDiaryForm");
    this.$bus.$off("selectMood");
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