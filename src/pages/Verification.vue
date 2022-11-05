// 邮箱验证码界面
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
    <h5 class="subtitle margin-bottom-20">
      请输入发送至xxx的6位验证码，有效期10分钟
    </h5>
    <VerificationCode class="margin-bottom-10"></VerificationCode>
    <div style="height: 20px">
      <h5 class="subtitle" v-if="second > 0">
        {{ second }}秒后可重新获取验证码
      </h5>
      <LinkText
        content="重新获取验证码"
        :fontSize="14"
        :showUnderline="false"
        v-if="second <= 0"
        @click.native="reGetVerifyCode"
        :enableChangeRoute="false"
      ></LinkText>
    </div>
    <MyButton :width="298" :height="40" :fontSize="16" class="myButton"
      >下一步</MyButton
    >
  </div>
</template>

<script>
import VerificationCode from "../components/complex/VerificationCode.vue";
import MyButton from "../components/basic/MyButton.vue";
import LinkText from "../components/text/LinkText.vue";
export default {
  name: "Verification",
  components: { VerificationCode, MyButton, LinkText },
  data() {
    return {
      second: 59,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    reGetVerifyCode() {
      this.second = 59;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.second -= 1;
    }, 1000);
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
  margin-top: 98px;
}
</style>