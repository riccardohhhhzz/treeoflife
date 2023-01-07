<template>
  <div class="form center">
    <div class="topBar"></div>
    <MyButton
      :width="60"
      :height="30"
      icon="back"
      :showIcon="true"
      color="#333"
      :fontSize="14"
      bgColor="transparent"
      hoverColor="#E8E9E9"
      :paddingHorizon="0"
      class="margin-bottom-10"
      @click.native="back"
      >返回</MyButton
    >
    <h3 class="margin-bottom-10">设置新密码</h3>
    <h5 class="subtitle margin-bottom-40" v-if="showWarn.length === 0">
      请输入6-20位字符，支持英文大小写、数字、下划线
    </h5>
    <h5 class="subtitle margin-bottom-40 warn" v-if="showWarn.length > 0">
      {{ showWarn }}
    </h5>
    <TextInput
      inputType="password"
      bgColor="transparent"
      :borderRadius="8"
      :focusBorderColor="pswBorderColor"
      :showShadow="false"
      @updateImmediately="checkNewPsw"
    ></TextInput>
    <MyButton
      :width="298"
      :height="40"
      :fontSize="16"
      :clickable="btnClickable"
      class="myButton"
      @click.native="gotoLogin"
      >下一步</MyButton
    >
    <MyDialog></MyDialog>
  </div>
</template>

<script>
import MyButton from "../../components/basic/MyButton.vue";
import TextInput from "../../components/basic/TextInput.vue";
import axios from "axios";
import MyDialog from "../../components/basic/MyDialog.vue";
export default {
  name: "SetNewPsw",
  components: { MyButton, TextInput, MyDialog },
  data() {
    return {
      newPsw: "",
      qualified: false,
      userEmail: "",
      showWarn: "",
    };
  },
  computed: {
    btnClickable() {
      return this.qualified;
    },
    pswBorderColor() {
      return this.qualified ? "#4dcf90" : "#F14947";
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    checkNewPsw(value) {
      this.showWarn = "";
      var valueCleaned = value.replace(/[^\a-\z\A-\Z0-9\_]/g, "");
      if (
        valueCleaned.length !== value.length ||
        value.length < 6 ||
        value.length > 20
      ) {
        this.qualified = false;
      } else {
        this.qualified = true;
      }
      this.newPsw = value;
    },
    gotoLogin() {
      if (this.btnClickable) {
        axios({
          url: "/changePassword",
          method: "post",
          params: {
            email: this.userEmail,
            password: this.newPsw,
          },
        }).then((res) => {
          var data = res.data;
          if (data.state === 2003) {
            this.showWarn =
              "格式错误，请输入6-20位字符，支持英文大小写、数字、下划线";
          }
          if (data.state === 200) {
            window.sessionStorage.removeItem("user");
            const dialogOptions = {
              title: "提示",
              content: "修改密码成功！",
              mainBtnContent: "确认",
              showSecondaryBtn: false,
              mainBtnClickHandler: () => {
                this.$router.push("/login");
              },
            };
            this.$bus.$emit("openDialog", dialogOptions);
          }
        });
      } else {
        this.showWarn =
          "格式错误，请输入6-20位字符，支持英文大小写、数字、下划线";
      }
    },
  },
  mounted() {
    this.userEmail = this.$route.params.email;
  },
};
</script>

<style scoped>
.form {
  width: 298px;
  height: 368px;
  border: 1px solid #cdcdcd;
  padding: 0px 31px 0px 29px;
  border-radius: 10px;
}
.topBar {
  width: 360px;
  height: 10px;
  background-color: #4dcf90;
  margin: -1px 0px 10px -30px;
  border-radius: 10px 10px 0px 0px;
}
.subtitle {
  color: #6e6e6e;
  font-weight: 400;
  font-size: 14px;
  height: 26px;
}
.myButton {
  margin-top: 92px;
}
.warn {
  color: #f14947;
}
</style>