<template>
  <div class="form">
    <div class="topBar"></div>
    <LifeTitle class="title"></LifeTitle>
    <div class="haveAccount">
      <h4 style="text-align: center">
        已有帐号？<LinkText
          content="登录"
          style="display: inline-block"
          href="https://baidu.com"
        ></LinkText>
      </h4>
    </div>
    <TextField
      title="邮箱"
      subtitle="您的电子邮件地址不会与任何人共享"
      class="margin-bottom-40"
    ></TextField>
    <TextField
      title="密码"
      inputType="password"
      class="margin-bottom-40"
    ></TextField>
    <TextField
      title="用户名"
      subtitle="这对其他Treeoflife成员可见。您可以使用匿名名称。"
    ></TextField>
    <!-- <MyDropdown></MyDropdown> -->
    <MyButton class="myButton">创建账号</MyButton>
  </div>
</template>

<script>
import TextField from "../components/basic/TextField.vue";
import LifeTitle from "../components/text/LifeTitle.vue";
import MyButton from "../components/basic/MyButton.vue";
import LinkText from "../components/text/LinkText.vue";
import MyDropdown from "../components/basic/MyDropdown.vue";
export default {
  name: "Register",
  components: { TextField, LifeTitle, MyButton, LinkText, MyDropdown },
};
</script>

<style scoped>
.form {
  width: 298px;
  height: 768px;
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
  margin: 70px 80px;
}
.haveAccount {
  margin-bottom: 30px;
  height: 20px;
}
</style>