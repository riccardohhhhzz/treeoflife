<template>
  <InfoForm title="兴趣爱好" subtitle="分享您的兴趣，与像您一样的人建立联系。">
    <div class="edit-hobby">
      <Tag
        v-for="(item, idx) in hobbies"
        :key="item"
        :nonEditedContent="item"
      ></Tag>
      <AddButton :showHint="false"></AddButton>
      <p v-if="hobbies.length === 0">添加兴趣爱好</p>
    </div>
    <MyButton :width="70" :height="40">保存</MyButton>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import Tag from "../basic/Tag.vue";
import AddButton from "../basic/AddButton.vue";
import MyButton from "../basic/MyButton.vue";
export default {
  name: "HobbyForm",
  components: { InfoForm, Tag, AddButton, MyButton },
  data() {
    return {
      hobbies: ["吃饭", "睡觉", "玩手机"],
    };
  },
};
</script>

<style scoped>
.edit-hobby {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
  gap: 15px;
}
p {
  font-size: 14px;
  color: #666666;
}
</style>