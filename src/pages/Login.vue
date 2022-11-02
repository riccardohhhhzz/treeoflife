<template>
  <div class="form center">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <UserInfoInputItem
      title="用户名/邮箱"
      class="margin-bottom-40"
    ></UserInfoInputItem>
    <UserInfoInputItem title="密码" inputType="password"></UserInfoInputItem>
    <MyButton class="myButton">登录</MyButton>
    <div class="links">
      <LinkText
        content="创建新账号"
        routeName="register"
        class="float-left"
      ></LinkText>
      <LinkText content="忘记密码？" class="float-right"></LinkText>
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
</style>