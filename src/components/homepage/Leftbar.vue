<template>
  <div id="leftbar">
    <ExpandBtn direction="left" @click.native="closeLeftbar"></ExpandBtn>
    <NavItem
      v-for="(item, idx) in navItemList"
      :icon="item.icon"
      :key="item.text"
      :focused="item.focused"
      @click.native="toggleNav(item.text)"
      >{{ item.text }}</NavItem
    >
    <NavItem icon="logout" class="nav-logout">退出登录</NavItem>
  </div>
</template>

<script>
import NavItem from "../basic/NavItem.vue";
import ExpandBtn from "../basic/ExpandBtn.vue";
export default {
  name: "Leftbar",
  components: { NavItem, ExpandBtn },
  data() {
    return {
      navItemList: [
        { icon: "home", text: "首页", focused: false },
        { icon: "health", text: "我的健康", focused: true },
        { icon: "user", text: "个人中心", focused: false },
        { icon: "help", text: "帮助", focused: false },
        { icon: "setting", text: "设置", focused: false },
      ],
    };
  },
  computed: {
    currrentNavName() {
      return this.navItemList.filter((item, idx) => item.focused)[0].text;
    },
  },
  methods: {
    toggleNav(navName) {
      // 防止点击相同路由时进行某些不必要的操作
      if (navName === this.currrentNavName) {
        return;
      }
      for (var item of this.navItemList) {
        if (item.text != navName) {
          item.focused = false;
        } else {
          item.focused = true;
        }
      }
    },
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