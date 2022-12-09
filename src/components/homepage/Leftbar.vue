<template>
  <div id="leftbar">
    <ExpandBtn direction="left" @click.native="closeLeftbar"></ExpandBtn>
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
  mounted() {
    document.getElementById("leftbar").style.transition = "1s";
    document.getElementById("leftbar").style.width = "15rem";
    this.$nextTick(() => {
      document.getElementById("leftbar").style.transition = "0.3s";
    });
  },
};
</script>

<style>
#leftbar {
  position: fixed;
  top: 4.8rem;
  left: 0;
  width: 0;
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