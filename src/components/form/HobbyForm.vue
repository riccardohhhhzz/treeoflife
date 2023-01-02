<template>
  <InfoForm title="兴趣爱好" subtitle="分享您的兴趣，与像您一样的人建立联系。">
    <div class="edit-hobby">
      <Tag
        v-for="(item, idx) in hobbies"
        :key="item"
        :nonEditedContent="item"
        ref="hobby-tag"
      ></Tag>
      <AddButton :showHint="false" @click.native="addNewHobby"></AddButton>
      <p v-if="hobbies.length === 0">添加兴趣爱好</p>
    </div>
    <MyButton :width="70" :height="40" @click.native="saveHobby">保存</MyButton>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import Tag from "../basic/Tag.vue";
import AddButton from "../basic/AddButton.vue";
import MyButton from "../basic/MyButton.vue";
import axios from "axios";
import { SessionUtils } from "@/utils";
export default {
  name: "HobbyForm",
  components: { InfoForm, Tag, AddButton, MyButton },
  data() {
    return {
      hobbies: this.$store.state.userAbout.userInfo.hobbies,
    };
  },
  methods: {
    saveHobby() {
      axios({
        url: "/userinfo/hobbies/update",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: this.$store.state.userAbout.userInfo.username,
          hobbies: this.hobbies,
        },
      }).then((res) => {
        const data = res.data;
        if (data.state === 200) {
          SessionUtils.set("user", data.data);
        }
      });
    },
    addNewHobby() {
      this.hobbies.push("");
      this.$nextTick(() => {
        let newHobbyTag = this.$refs["hobby-tag"][this.hobbies.length - 1];
        newHobbyTag.enterEditState();
      });
    },
    modifyTagContent(oldKey, newKey) {
      if (!newKey || (this.hobbies.indexOf(newKey) >= 0 && oldKey != newKey)) {
        this.hobbies.splice(this.hobbies.length - 1, 1);
        return;
      }
      let idx = this.hobbies.indexOf(oldKey);
      this.hobbies.splice(idx, 1, newKey);
    },
    delTag(key) {
      let idx = this.hobbies.indexOf(key);
      this.hobbies.splice(idx, 1);
    },
  },
  mounted() {
    this.hobbies = this.hobbies.filter((item) => item);
    this.$bus.$on("modifyTagContent", this.modifyTagContent);
    this.$bus.$on("delTag", this.delTag);
  },
  beforeDestroy() {
    this.$bus.$off("modifyTagContent");
    this.$bus.$off("delTag");
  },
};
</script>

<style scoped>
.edit-hobby {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
  flex-flow: wrap;
  gap: 15px;
}
p {
  font-size: 14px;
  color: #666666;
}
</style>