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
    <h3 class="margin-bottom-10">输入邮箱验证码</h3>
    <h5 class="subtitle margin-bottom-20" v-if="showWarn.length === 0">
      请输入发送至<font class="email">{{ userEmail }}</font
      >的6位验证码，有效期10分钟
    </h5>
    <h5 class="subtitle margin-bottom-20 warn" v-if="showWarn.length > 0">
      {{ showWarn }}
    </h5>
    <VerificationCode
      class="margin-bottom-10"
      @finished="getVerifyCode"
      :showWarn="showWarn.length > 0"
    ></VerificationCode>
    <div style="height: 20px">
      <h5 class="subtitle" v-if="second > 0">
        {{ second }}秒后可重新获取验证码
      </h5>
      <LinkText
        content="重新获取验证码"
        :fontSize="14"
        v-if="second <= 0"
        @click.native="reGetVerifyCode"
      ></LinkText>
    </div>
    <MyButton
      :width="298"
      :height="40"
      :fontSize="16"
      :clickable="btnClickable"
      class="myButton"
      @click.native="gotoPage"
      >下一步</MyButton
    >
  </div>
</template>

<script>
import VerificationCode from "../../components/complex/VerificationCode.vue";
import MyButton from "../../components/basic/MyButton.vue";
import LinkText from "../../components/text/LinkText.vue";
import axios from "axios";
export default {
  name: "Verification",
  components: { VerificationCode, MyButton, LinkText },
  data() {
    return {
      second: 59,
      verifyCode: "",
      userEmail: "",
      // 从哪个路由来的
      from: "",
      showWarn: "",
    };
  },
  computed: {
    btnClickable() {
      return this.verifyCode.length === 6;
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    reGetVerifyCode() {
      this.second = 59;
      axios({
        url: "/verify/resend",
        method: "post",
        params: {
          email: this.userEmail,
        },
      });
    },
    getVerifyCode(value) {
      this.verifyCode = value;
      this.showWarn = "";
    },
    gotoPage() {
      if (this.btnClickable) {
        axios({
          url: "/verify",
          method: "post",
          params: {
            email: this.userEmail,
            code: this.verifyCode,
          },
        }).then((res) => {
          var data = res.data;
          if (data.state === 2010) {
            this.showWarn = "验证码错误, 请重新输入";
          }
          if (data.state === 200) {
            this.showWarn = "";
            if (this.from === "login") {
              this.$router.push({
                name: "setnewpsw",
                params: {
                  email: this.userEmail,
                },
              });
            }
            if (this.from === "register") {
              alert("注册成功！欢迎加入Treeoflife");
              window.sessionStorage.setItem("user", JSON.stringify(data.data));
              this.$router.push({
                path: "/e",
              });
            }
          }
        });
      } else {
        alert("请输入验证码");
      }
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.second -= 1;
    }, 1000);
    this.userEmail = this.$route.params.email;
    this.from = this.$route.params.from;
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
}
.myButton {
  position: absolute;
  bottom: 8%;
}
.email {
  color: #000;
  font-weight: 500;
}
.warn {
  color: #f14947;
}
</style>