<template>
  <div class="form">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <TextField title="用户名/邮箱" class="margin-bottom-40"></TextField>
    <TextField title="密码" inputType="password"></TextField>
    <MyButton class="myButton"></MyButton>
    <div class="links">
      <LinkText
        content="创建新账号"
        href="https://baidu.com"
        class="float-left"
      ></LinkText>
      <LinkText
        content="忘记密码？"
        href="https://baidu.com"
        class="float-right"
      ></LinkText>
    </div>
  </div>
</template>

<script>
import TextField from "../components/basic/TextField.vue";
import LifeTitle from "../components/text/LifeTitle.vue";
import MyButton from "../components/basic/MyButton.vue";
import LinkText from "../components/text/LinkText.vue";
export default {
  name: "Login",
  components: { TextField, LifeTitle, MyButton, LinkText },
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