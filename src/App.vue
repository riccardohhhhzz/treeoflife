<template>
  <div id="app">
    <Register class="center"></Register>
  </div>
</template>

<script>
import Register from "./pages/Register.vue";
export default {
  name: "App",
  components: { Register },
};
</script>

<style>
/* 清除原始页面的内外边距 */
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: "Microsoft YaHei", tahoma, arial, "Hiragino Sans GB";
}
a {
  text-decoration: none;
}
.center {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
.margin-bottom-40 {
  margin-bottom: 40px;
}
.margin-bottom-50 {
  margin-bottom: 50px;
}
.display-inline-block {
  display: inline-block;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
</style>
