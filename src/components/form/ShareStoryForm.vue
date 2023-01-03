<template>
  <InfoForm
    title="分享你的故事"
    subtitle="你的故事将会显示在你的个人资料页面上"
  >
    <QuillEditor
      class="editor"
      minHeight="150px"
      :defaultContent="story"
      ref="story-editor"
    ></QuillEditor>
    <MyButton :width="70" :height="40" @click.native="saveStory">保存</MyButton>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import QuillEditor from "../complex/QuillEditor.vue";
import MyButton from "../basic/MyButton.vue";
import axios from "axios";
import { SessionUtils } from "@/utils";
export default {
  name: "ShareStoryForm",
  components: { InfoForm, QuillEditor, MyButton },
  data() {
    return {
      story: this.$store.state.userAbout.userInfo.story,
    };
  },
  methods: {
    saveStory() {
      const newStory = this.$refs["story-editor"].content;
      axios({
        url: "/userinfo/story/update",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: this.$store.state.userAbout.userInfo.username,
          story: newStory,
        },
      })
        .then((res) => {
          const data = res.data;
          if (data.state === 200) {
            SessionUtils.set("user", data.data);
            const dialogOptions = {
              title: "提示",
              content: "保存成功",
              mainBtnContent: "确认",
              showSecondaryBtn: false,
              mainBtnClickHandler: () => {},
            };
            this.$bus.$emit("openDialog", dialogOptions);
          }
        })
        .catch((e) => {
          const dialogOptions = {
            title: "提示",
            content: "保存失败！",
            mainBtnContent: "重试",
            secondaryBtnContent: "取消",
            showSecondaryBtn: true,
            mainBtnClickHandler: this.saveStory,
            secondaryBtnClickHandler: () => {},
          };
          this.$bus.$emit("openDialog", dialogOptions);
        });
    },
  },
};
</script>

<style scoped>
.editor {
  margin: 20px 0;
}
</style>