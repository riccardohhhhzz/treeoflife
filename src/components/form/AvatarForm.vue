<template>
  <InfoForm title="头像" :showEditBtn="false">
    <div class="edit-avatar">
      <Avatar
        type="info"
        avatarWidth="100px"
        fontSize="48px"
        class="avatar"
      ></Avatar>
      <MyButton
        bgColor="transparent"
        color="#333333"
        borderColor="#999999"
        hoverColor="#e6e6e6"
        @click.native="openUploadAvatarForm"
        >上传图片</MyButton
      >
    </div>
    <UploadAvatarForm></UploadAvatarForm>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import Avatar from "../basic/Avatar.vue";
import MyButton from "../basic/MyButton.vue";
import UploadAvatarForm from "./UploadAvatarForm.vue";
export default {
  name: "AvatarForm",
  components: { InfoForm, Avatar, MyButton, UploadAvatarForm },
  methods: {
    openUploadAvatarForm() {
      this.$bus.$emit("openUploadAvatarForm");
    },
  },
};
</script>

<style scoped>
.edit-avatar {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.avatar {
  margin: 0 10px;
}
</style>