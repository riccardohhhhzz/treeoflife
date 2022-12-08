<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* 清除原始页面的内外边距 */
* {
  padding: 0;
  margin: 0;
}
html,
body {
  font-family: "Microsoft YaHei", tahoma, arial, "Hiragino Sans GB";
  font-size: 16px;
}
body {
  overflow-y: scroll;
  overflow-x: hidden;
}
a {
  text-decoration: none;
}
select {
  /*将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
}
.center {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
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
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
