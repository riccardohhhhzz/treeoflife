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
        >{{ uploadBtnContent }}</MyButton
      >
      <MyButton
        v-if="ownAvatar"
        bgColor="transparent"
        color="#333333"
        borderColor="#999999"
        hoverColor="#e6e6e6"
        @click.native="deleteAvatar"
        >删除图片</MyButton
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
import axios from "axios";
import { SessionUtils } from "@/utils";
export default {
  name: "AvatarForm",
  components: { InfoForm, Avatar, MyButton, UploadAvatarForm },
  data() {
    return {
      ownAvatar: false,
    };
  },
  computed: {
    uploadBtnContent() {
      return this.ownAvatar ? "更改图片" : "上传图片";
    },
  },
  methods: {
    openUploadAvatarForm() {
      this.$bus.$emit("openUploadAvatarForm");
    },
    deleteAvatar() {
      const dialogOptions = {
        title: "提示",
        content: "确认删除当前图片吗",
        mainBtnContent: "确认",
        secondaryBtnContent: "取消",
        showSecondaryBtn: true,
        mainBtnClickHandler: () => {
          axios({
            url: "/userinfo/icon/delete",
            headers: { "Content-Type": "application/json" },
            method: "post",
            params: {
              username: this.$store.state.userAbout.userInfo.username,
            },
          }).then((res) => {
            const data = res.data;
            if (data.state === 200) {
              SessionUtils.set("user", data.data);
              this.$bus.$emit("updateAvatar", null);
              this.ownAvatar = false;
            }
          });
        },
        secondaryBtnClickHandler: () => {},
      };
      this.$bus.$emit("openDialog", dialogOptions);
    },
  },
  mounted() {
    this.ownAvatar = this.$store.state.userAbout.userInfo.iconURL !== null;
    this.$bus.$on("updateAvatar", (e) => {
      this.ownAvatar = true;
    });
  },
};
</script>

<style scoped>
.edit-avatar {
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.avatar {
  margin-left: 10px;
}
</style>