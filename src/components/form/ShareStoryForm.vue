<template>
  <InfoForm
    title="分享你的故事"
    subtitle="你的故事将会显示在你的个人资料页面上"
  >
    <QuillEditor class="editor" minHeight="150px"></QuillEditor>
    <MyButton :width="70" :height="40">保存</MyButton>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import QuillEditor from "../complex/QuillEditor.vue";
import MyButton from "../basic/MyButton.vue";
export default {
  name: "ShareStoryForm",
  components: { InfoForm, QuillEditor, MyButton },
};
</script>

<style scoped>
.editor {
  margin: 20px 0;
}
</style>