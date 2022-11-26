<template>
  <div id="diaryForm">
    <MyForm>
      <template slot="title">
        <h2 class="title">发布日记</h2>
      </template>
      <template slot="content">
        <div class="content">
          <MyTextEditor></MyTextEditor>
        </div>
      </template>
    </MyForm>
  </div>
</template>

<script>
import MyForm from "../basic/MyForm.vue";
import MyTextEditor from "../complex/MyTextEditor.vue";
export default {
  name: "DiaryForm",
  components: { MyForm, MyTextEditor },
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
  margin: 20px 25px;
  border: 1px solid #979797;
  min-height: 200px;
  max-height: 300px;
}
</style>