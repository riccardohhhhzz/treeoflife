<template>
  <div class="form center">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <div class="haveAccount">
      <h4 style="text-align: center">
        已有帐号？<LinkText
          content="登录"
          style="display: inline-block"
          @click="gotoLogin"
        ></LinkText>
      </h4>
    </div>
    <UserInfoInputItem
      title="邮箱"
      subtitle="您的电子邮件地址不会与任何人共享"
      class="infoInput margin-bottom-20"
      :hint="emailHint"
      @input="updateEmail"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="密码"
      inputType="password"
      class="infoInput"
      :hint="pswHint"
      @input="updatePsw"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="用户名"
      subtitle="这对其他Treeoflife成员可见。您可以使用匿名名称。"
      class="infoInput margin-bottom-40"
      :hint="usernameHint"
      @input="updateUsername"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="生日"
      subtitle="这仅对其他 Treeoflife 社区成员可见。"
      inputType="birthday"
      class="infoInput"
      :hint="birthdayHint"
      @input="updateBirthday"
    ></UserInfoInputItem>
    <MyButton class="myButton" :width="180" @click.native="gotoVerification"
      >创建账号</MyButton
    >
  </div>
</template>

<script>
import LifeTitle from "../components/text/LifeTitle.vue";
import MyButton from "../components/basic/MyButton.vue";
import LinkText from "../components/text/LinkText.vue";
import UserInfoInputItem from "../components/complex/UserInfoInputItem.vue";

export default {
  name: "Register",
  components: {
    LifeTitle,
    MyButton,
    LinkText,
    UserInfoInputItem,
  },
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
        userName: "",
        birthday: {
          year: null,
          month: null,
          day: null,
        },
      },
      showWarn: {
        email: false,
        psw: false,
        username: false,
        birthday: false,
      },
    };
  },
  computed: {
    birthdayEmptyInput() {
      return (
        this.userInfo.birthday.year === null ||
        this.userInfo.birthday.month === null ||
        this.userInfo.birthday.day === null
      );
    },
    emptyInput() {
      return (
        this.userInfo.email.length === 0 ||
        this.userInfo.password.length === 0 ||
        this.userInfo.userName === 0 ||
        this.birthdayEmptyInput
      );
    },
    emailHint() {
      // case1: 输入为空
      var hint1 = "请输入个人邮箱";
      if (this.showWarn["email"] && this.userInfo.email.length === 0) {
        this.showWarn["email"] = false;
        return hint1;
      }
      return "";
    },
    pswHint() {
      // case1: 输入为空
      var hint1 = "请设置密码";
      if (this.showWarn["psw"] && this.userInfo.password.length === 0) {
        this.showWarn["psw"] = false;
        return hint1;
      }
      return "";
    },
    usernameHint() {
      // case1: 输入为空
      var hint1 = "请设置用户名";
      if (this.showWarn["username"] && this.userInfo.userName.length === 0) {
        this.showWarn["username"] = false;
        return hint1;
      }
      return "";
    },
    birthdayHint() {
      // case1: 输入为空
      var hint1 = "请输入您的生日";
      if (this.showWarn["birthday"] && this.birthdayEmptyInput) {
        this.showWarn["birthday"] = false;
        return hint1;
      }
      return "";
    },
  },
  methods: {
    gotoVerification() {
      //  TODO: 发送axios请求
      if (!this.emptyInput) {
        this.$router.push({
          name: "verify",
          params: {
            email: this.userInfo.email,
            from: "register",
          },
        });
      } else {
        for (var key in this.showWarn) {
          this.showWarn[key] = true;
        }
      }
    },
    gotoLogin() {
      this.$router.push("/login");
    },
    updateEmail(value) {
      this.userInfo.email = value || "";
    },
    updatePsw(value) {
      this.userInfo.password = value || "";
    },
    updateUsername(value) {
      this.userInfo.userName = value || "";
    },
    updateBirthday(value) {
      this.userInfo.birthday = value || "";
    },
  },
};
</script>

<style scoped>
.form {
  width: 298px;
  height: 868px;
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
  margin-bottom: 30px;
}
.myButton {
  margin: 40px 60px;
}
.haveAccount {
  margin-bottom: 30px;
  height: 20px;
}
.infoInput {
  height: 125px;
}
</style>