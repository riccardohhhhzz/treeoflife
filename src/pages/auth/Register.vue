<template>
  <div class="form center">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <div class="haveAccount">
      <h4 style="text-align: center">
        已有帐号？<LinkText style="display: inline-block" @click="gotoLogin"
          >登录</LinkText
        >
      </h4>
    </div>
    <UserInfoInputItem
      title="邮箱"
      subtitle="您的电子邮件地址不会与任何人共享"
      class="infoInput margin-bottom-20"
      :hint="showWarn.email"
      @input="updateEmail"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="密码"
      inputType="password"
      class="infoInput"
      :hint="showWarn.psw"
      @input="updatePsw"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="用户名"
      subtitle="这对其他Treeoflife成员可见。您可以使用匿名名称。"
      class="infoInput margin-bottom-40"
      :hint="showWarn.username"
      @input="updateUsername"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="生日"
      subtitle="这仅对其他 Treeoflife 社区成员可见。"
      inputType="birthday"
      class="infoInput"
      :hint="showWarn.birthday"
      @input="updateBirthday"
    ></UserInfoInputItem>
    <MyButton class="myButton" :width="180" @click.native="gotoVerification"
      >创建账号</MyButton
    >
  </div>
</template>

<script>
import LifeTitle from "../../components/text/LifeTitle.vue";
import MyButton from "../../components/basic/MyButton.vue";
import LinkText from "../../components/text/LinkText.vue";
import UserInfoInputItem from "../../components/complex/UserInfoInputItem.vue";
import axios from "axios";

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
        username: "",
        birthday: {
          year: null,
          month: null,
          day: null,
        },
      },
      showWarn: {
        email: "",
        psw: "",
        username: "",
        birthday: "",
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
        this.userInfo.username === 0 ||
        this.birthdayEmptyInput
      );
    },
  },
  methods: {
    clearWarn() {
      for (var key in this.showWarn) {
        this.showWarn[key] = "";
      }
    },
    gotoVerification() {
      //  TODO: 发送axios请求
      if (!this.emptyInput) {
        axios({
          url: "/reg",
          method: "post",
          data: this.userInfo,
        }).then((res) => {
          var data = res.data;
          if (data.state === 2001) {
            this.clearWarn();
            this.showWarn.email = "该邮箱已被注册";
          }
          if (data.state === 2002) {
            this.clearWarn();
            this.showWarn.email = "邮箱不合法";
          }
          if (data.state === 2003) {
            this.clearWarn();
            this.showWarn.psw = "请输入6-20位字符,支持英文、数字、下划线";
          }
          if (data.state === 2004) {
            this.clearWarn();
            this.showWarn.username = "请输入4-16位字符,支持英文、数字、下划线";
          }
          if (data.state === 2005) {
            this.clearWarn();
            this.showWarn.username = "该用户名已被注册";
          }
          if (data.state === 200) {
            this.$router.push({
              name: "verify",
              params: {
                email: this.userInfo.email,
                from: "register",
              },
            });
          }
        });
      } else {
        if (this.userInfo.email.length === 0) {
          this.showWarn.email = "请输入邮箱";
        } else {
          this.showWarn.email = "";
        }
        if (this.userInfo.password.length === 0) {
          this.showWarn.psw = "请输入密码";
        } else {
          this.showWarn.psw = "";
        }
        if (this.userInfo.username.length === 0) {
          this.showWarn.username = "请输入用户名";
        } else {
          this.showWarn.username = "";
        }
        if (this.birthdayEmptyInput) {
          this.showWarn.birthday = "请输入生日";
        } else {
          this.showWarn.birthday = "";
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
      this.userInfo.username = value || "";
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