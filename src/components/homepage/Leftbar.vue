<template>
  <div id="leftbar">
    <ExpandBtn icon="arrow-left" @click.native="closeLeftbar"></ExpandBtn>
    <NavItem icon="home">首页</NavItem>
    <NavItem icon="health">我的健康</NavItem>
    <NavItem icon="user">个人中心</NavItem>
    <NavItem icon="help">帮助</NavItem>
    <NavItem icon="setting">设置</NavItem>
    <NavItem icon="logout" class="nav-logout">退出登录</NavItem>
  </div>
</template>

<script>
import NavItem from "../basic/NavItem.vue";
import ExpandBtn from "../basic/ExpandBtn.vue";
export default {
  name: "Leftbar",
  components: { NavItem, ExpandBtn },
  methods: {
    closeLeftbar() {
      document.getElementById("leftbar").style.width = "0";
    },
  },
};
</script>

<style>
#leftbar {
  position: relative;
  width: 15rem;
  height: calc(100% - 4.8rem);
  overflow-x: hidden;
  background-color: #2b2d34;
  transition: 0.3s;
}
.nav-logout {
  position: absolute;
  bottom: 5%;
}
</style>