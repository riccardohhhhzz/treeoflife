<template>
  <div class="form center">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <UserInfoInputItem
      title="用户名/邮箱"
      class="margin-bottom-40 userInput"
      :hint="emailInputHint"
      @input="updateEmail"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="密码"
      class="userInput"
      :hint="pswInputHint"
      @input="updatePsw"
      inputType="password"
    ></UserInfoInputItem>
    <MyButton class="myButton" @click.native="gotoHomepage">登录</MyButton>
    <div class="links">
      <LinkText
        content="创建新账号"
        routeName="register"
        class="float-left"
      ></LinkText>
      <LinkText
        content="忘记密码？"
        routeName="setnewpsw"
        class="float-right"
      ></LinkText>
    </div>
  </div>
</template>

<script>
import LifeTitle from "../components/text/LifeTitle.vue";
import MyButton from "../components/basic/MyButton.vue";
import LinkText from "../components/text/LinkText.vue";
import UserInfoInputItem from "../components/complex/UserInfoInputItem.vue";
export default {
  name: "Login",
  components: { LifeTitle, MyButton, LinkText, UserInfoInputItem },
  data() {
    return {
      loginInfo: {
        usernameOrEmail: "",
        password: "",
      },
      // 保证初次渲染时不会报警示
      showWarn: false,
    };
  },
  computed: {
    emptyInput() {
      return (
        this.loginInfo.usernameOrEmail.length === 0 ||
        this.loginInfo.password.length === 0
      );
    },
    emailInputHint() {
      // case1: 输入为空
      var hint1 = "请输入用户名/邮箱";
      // case2: 后端判断没有该邮箱；
      var hint2 = "请输入正确的用户名/邮箱";
      if (this.loginInfo.usernameOrEmail.length === 0 && this.showWarn) {
        return hint1;
      }
      return "";
    },
    pswInputHint() {
      // case1: 输入为空
      var hint1 = "请输入密码";
      // case2: 后端判断密码错误；
      var hint2 = "请输入正确的密码";
      if (this.loginInfo.password.length === 0 && this.showWarn) {
        return hint1;
      }
      return "";
    },
  },
  methods: {
    gotoHomepage() {
      if (!this.emptyInput) {
        this.$router.push({
          name: "homepage",
        });
      } else {
        this.showWarn = true;
      }
    },
    updateEmail(value) {
      this.loginInfo.usernameOrEmail = value || "";
    },
    updatePsw(value) {
      this.loginInfo.password = value || "";
    },
  },
};
</script>

<style scoped>
.form {
  width: 298px;
  height: 568px;
  border: 1px solid #cdcdcd;
  padding: 0px 31px 0px 29px;
  border-radius: 10px;
}
.topBar {
  width: 360px;
  height: 10px;
  background-color: #4dcf90;
  margin: -1px 0px 0px -30px;
  border-radius: 10px 10px 0px 0px;
}
.title {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
}
.myButton {
  margin: 70px 80px;
}
.userInput {
  height: 81px;
}
</style>