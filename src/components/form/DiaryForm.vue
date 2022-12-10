<template>
  <MyForm id="diary-form" v-show="showDiaryForm" ref="form" :key="componentKey">
    <template slot="title">
      <h2 class="title">发布日记</h2>
    </template>
    <template slot="content">
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
    </template>
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
      showDiaryForm: false,
      publishable: false,
      selectedMood: "default",
      componentKey: 0,
    };
  },
  methods: {
    ...mapActions("diaryAbout", ["updateCondition"]),
    publishDiary() {
      var myDate = new Date();
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
      }).then((res) => {
        var data = res.data;
        if (data.state === 200) {
          this.updateCondition(this.selectedMood);
          this.$bus.$emit("conditionsUpdated");
          this.$bus.$emit("publishNewDiary", data.data);
          this.clearCondition();
        } else {
          console.log("发布失败");
        }
      });
    },
    updateSelectedMood(data) {
      this.selectedMood = data;
      this.publishable = true;
    },
    openDiaryForm() {
      this.showDiaryForm = true;
      this.$refs["form"].openDialog();
    },
    closeDiaryForm() {
      this.showDiaryForm = false;
      this.$refs["form"].closeDialog();
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