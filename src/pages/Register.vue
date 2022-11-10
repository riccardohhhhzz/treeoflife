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
      class="margin-bottom-40"
      ref="email"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="密码"
      inputType="password"
      class="margin-bottom-40"
      ref="psw"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="用户名"
      subtitle="这对其他Treeoflife成员可见。您可以使用匿名名称。"
      class="margin-bottom-40"
      ref="username"
    ></UserInfoInputItem>
    <UserInfoInputItem
      title="生日"
      subtitle="这仅对其他 Treeoflife 社区成员可见。"
      inputType="birthday"
      ref="birthday"
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
        email: null,
        password: null,
        userName: null,
        birthday: {
          year: null,
          month: null,
          day: null,
        },
      },
    };
  },
  methods: {
    gotoVerification() {
      // 收集表单数据
      this.userInfo.email = this.$refs["email"].value;
      this.userInfo.password = this.$refs["psw"].value;
      this.userInfo.userName = this.$refs["username"].value;
      this.userInfo.birthday = this.$refs["birthday"].value;
      //  TODO: 发送axios请求

      this.$router.push({
        name: "verify",
        params: {
          email: this.userInfo.email,
          from: "register",
        },
      });
    },
    gotoLogin() {
      this.$router.push("/login");
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
  margin: 70px 60px;
}
.haveAccount {
  margin-bottom: 30px;
  height: 20px;
}
</style>