<template>
  <div class="form center">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <UserInfoInputItem
      title="用户名/邮箱"
      class="margin-bottom-40 userInput"
      :hint="showWarn.email"
      @input="updateEmail"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="密码"
      class="userInput"
      :hint="showWarn.psw"
      @input="updatePsw"
      inputType="password"
    ></UserInfoInputItem>
    <MyButton class="myButton" @click.native="gotoHomepage">登录</MyButton>
    <div class="links">
      <LinkText class="float-left" @click="gotoRegister">创建新账号</LinkText>
      <LinkText class="float-right" @click="gotoSetNewPsw">忘记密码？</LinkText>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LifeTitle from "../../components/text/LifeTitle.vue";
import MyButton from "../../components/basic/MyButton.vue";
import LinkText from "../../components/text/LinkText.vue";
import UserInfoInputItem from "../../components/complex/UserInfoInputItem.vue";
export default {
  name: "Login",
  components: { LifeTitle, MyButton, LinkText, UserInfoInputItem },
  data() {
    return {
      loginInfo: {
        usernameOrEmail: "",
        password: "",
      },
      showWarn: {
        email: "",
        psw: "",
      },
    };
  },
  computed: {
    emptyInput() {
      return (
        this.loginInfo.usernameOrEmail.length === 0 ||
        this.loginInfo.password.length === 0
      );
    },
  },
  methods: {
    gotoHomepage() {
      if (!this.emptyInput) {
        axios({
          url: "/login",
          method: "post",
          params: {
            username_or_email: this.loginInfo.usernameOrEmail,
            password: this.loginInfo.password,
          },
        }).then((res) => {
          var data = res.data;
          if (data.state === 1000) {
            this.showWarn.psw = "密码错误";
            this.showWarn.email = "";
          }
          if (data.state === 1001) {
            this.showWarn.email = "用户名/邮箱未注册";
            this.showWarn.psw = "";
          }
          if (data.state === 200) {
            if (data.data.state === "active") {
              window.sessionStorage.setItem("user", JSON.stringify(data.data));
              this.$store.commit("userAbout/INITUSERINFO", data.data);
              this.$router.push({
                path: "/e",
              });
            }
            if (data.data.state === "inactive") {
              this.$router.push({
                name: "verify",
                params: {
                  email: data.data.email,
                  from: "register",
                },
              });
            }
          }
        });
      } else {
        if (this.loginInfo.usernameOrEmail.length === 0) {
          this.showWarn.email = "请输入用户名/邮箱";
        } else {
          this.showWarn.email = "";
        }
        if (this.loginInfo.password.length === 0) {
          this.showWarn.psw = "请输入密码";
        } else {
          this.showWarn.psw = "";
        }
      }
    },
    gotoRegister() {
      this.$router.push("/register");
    },
    gotoSetNewPsw() {
      // 只有当用户输入了邮箱，才可进入
      axios({
        url: "/verify/resend",
        method: "post",
        params: {
          email: this.loginInfo.usernameOrEmail,
        },
      }).then((res) => {
        var data = res.data;
        if (data.state === 1001) {
          this.showWarn.email = "请输入您的个人注册邮箱";
        }
        if (data.state === 200) {
          this.$router.push({
            name: "verify",
            params: {
              email: this.loginInfo.usernameOrEmail,
              from: "login",
            },
          });
        }
      });
      // var string = this.loginInfo.usernameOrEmail.replace(/\s|&nbsp;/g, "");
      // var reg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      // if (reg.test(string)) {
      //   this.$router.push({
      //     name: "verify",
      //     params: {
      //       email: string,
      //       from: "login",
      //     },
      //   });
      // } else {
      //   this.showWarn.email = "请输入您的个人注册邮箱";
      // }
    },
    updateEmail(value) {
      this.loginInfo.usernameOrEmail = value || "";
      this.showWarn.email = "";
    },
    updatePsw(value) {
      this.loginInfo.password = value || "";
      this.showWarn.psw = "";
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