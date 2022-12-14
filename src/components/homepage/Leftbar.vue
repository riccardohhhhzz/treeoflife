<template>
  <div id="leftbar">
    <ExpandBtn direction="left" @click.native="closeLeftbar"></ExpandBtn>
    <NavItem
      v-for="(item, idx) in navItemList"
      :icon="item.icon"
      :key="item.text"
      :focused="item.focused"
      @click.native="toggleNav(item)"
      >{{ item.text }}</NavItem
    >
    <NavItem icon="logout" class="nav-logout" @click.native="gotoLogin"
      >退出登录</NavItem
    >
  </div>
</template>

<script>
import NavItem from "../basic/NavItem.vue";
import ExpandBtn from "../basic/ExpandBtn.vue";
import { SessionUtils } from "@/utils";
export default {
  name: "Leftbar",
  components: { NavItem, ExpandBtn },
  data() {
    return {
      navItemList: [
        { icon: "home", text: "首页", focused: false, path: "/e/homepage" },
        {
          icon: "health",
          text: "我的健康",
          focused: true,
          path: "/e/myhealth",
        },
        {
          icon: "user",
          text: "个人中心",
          focused: false,
          path: "/e/personalcenter",
        },
        { icon: "help", text: "帮助", focused: false, path: "/e/help" },
        { icon: "setting", text: "设置", focused: false, path: "/e/setting" },
      ],
    };
  },
  computed: {
    currrentNavName() {
      return this.navItemList.filter((item, idx) => item.focused)[0].text;
    },
  },
  methods: {
    gotoLogin() {
      SessionUtils.remove("user");
      this.$router.replace({
        path: "/login",
      });
    },
    navPathChanged() {
      var currentPath = this.$router.history.current.path;
      for (var item of this.navItemList) {
        if (item.path != currentPath) {
          item.focused = false;
        } else {
          item.focused = true;
        }
      }
    },
    toggleNav(nav) {
      // 防止点击相同路由时进行某些不必要的操作
      if (nav.text === this.currrentNavName) {
        return;
      }
      this.$router.replace({
        path: nav.path,
      });
      for (var item of this.navItemList) {
        if (item.text != nav.text) {
          item.focused = false;
        } else {
          item.focused = true;
        }
      }
    },
    closeLeftbar() {
      document.getElementById("leftbar").style.transition = "0.3s";
      document.getElementById("leftbar").style.width = "0";
    },
  },
  beforeMount() {
    this.navPathChanged();
  },
  mounted() {
    document.getElementById("leftbar").style.transition = "1s";
    document.getElementById("leftbar").style.width = "15rem";
    this.$bus.$on("navPathChanged", this.navPathChanged);
  },
  beforeDestroy() {
    this.$bus.$off("navPathChanged");
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