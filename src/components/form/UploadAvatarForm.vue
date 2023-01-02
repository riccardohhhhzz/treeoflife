<template>
  <MyForm id="upload-avatar-form" ref="form" minHeight="210px">
    <div class="form-box">
      <h2 class="title">选择一张图片，然后点击上传</h2>
      <h4 class="subtitle">选择不超过 10MB 的 JPEG、JPG 或 PNG</h4>
      <div class="upload-avatar">
        <input
          type="file"
          accept="image/gif, image/jpeg, image/png"
          @change="insertImg"
        />
        <MyButton
          :width="120"
          :height="40"
          :clickable="fileChosen"
          :loading="uploading"
          loadingText="上传中"
          @click.native="uploadAvatar"
          >上传</MyButton
        >
      </div>
    </div>
  </MyForm>
</template>

<script>
import MyForm from "../basic/MyForm.vue";
import MyButton from "../basic/MyButton.vue";
import axios from "axios";
import { SessionUtils } from "@/utils";
export default {
  name: "UploadAvatarForm",
  components: { MyForm, MyButton },
  data() {
    return {
      fileChosen: false,
      base64Img: null,
      uploading: false,
    };
  },
  watch: {
    base64Img: {
      immediate: true,
      handler(value) {
        if (value === null) {
          this.fileChosen = false;
        } else {
          this.fileChosen = true;
        }
      },
    },
  },
  methods: {
    uploadAvatar() {
      if (this.uploading) {
        return;
      }
      if (!this.uploading && this.fileChosen) {
        this.uploading = true;
        // TODO: 衔接后端完成上传图片任务
        axios({
          url: "/pic/upload",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: {
            data: this.base64Img,
            username: this.$store.state.userAbout.userInfo.username,
          },
        })
          .then((res) => {
            this.uploading = false;
            const data = res.data;
            if (data.state === 200) {
              const imgURL = data.url;
              axios({
                url: "/userinfo/icon/update",
                headers: { "Content-Type": "application/json" },
                method: "post",
                data: {
                  username: this.$store.state.userAbout.userInfo.username,
                  url: imgURL,
                },
              }).then((res) => {
                const data = res.data;
                if (data.state === 200) {
                  SessionUtils.set("user", data.data);
                  this.closeUploadAvatarForm();
                }
              });
            }
          })
          .catch((e) => {
            this.uploading = false;
            const dialogOptions = {
              title: "提示",
              content: "上传图片失败！",
              mainBtnContent: "重试",
              secondaryBtnContent: "取消",
              showSecondaryBtn: true,
              mainBtnClickHandler: this.uploadAvatar,
              secondaryBtnClickHandler: () => {},
            };
            this.$bus.$emit("openDialog", dialogOptions);
          });
      }
    },
    insertImg(e) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onload = () => {
        this.base64Img = reader.result;
      };
      reader.readAsDataURL(file);
    },
    openUploadAvatarForm() {
      this.$refs["form"].openForm();
    },
    closeUploadAvatarForm() {
      this.$refs["form"].closeForm();
    },
  },
  mounted() {
    this.$bus.$on("openUploadAvatarForm", this.openUploadAvatarForm);
  },
  beforeDestroy() {
    this.$bus.$off("openUploadAvatarForm");
  },
};
</script>

<style scoped>
.form-box {
  margin: 20px 25px;
}
.title,
.subtitle {
  font-weight: 500;
}
.title {
  font-size: 24px;
  color: #333;
}
.subtitle {
  font-size: 16px;
  color: #888888;
  margin-top: 15px;
}
.upload-avatar {
  display: flex;
  align-items: center;
  margin-top: 30px;
}
</style>