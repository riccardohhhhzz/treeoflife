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
      let newStory = this.$refs["story-editor"].content;
      axios({
        url: "/userinfo/story/update",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: this.$store.state.userAbout.userInfo.username,
          story: this.newStory,
        },
      }).then((res) => {
        var data = res.data;
        console.log(data);
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