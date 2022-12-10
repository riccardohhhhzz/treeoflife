<template>
  <div id="rightbar">
    <ExpandBtn
      direction="right"
      iconColor="#999999"
      hoverIconColor="#64666d"
      @click.native="closeRightbar"
    ></ExpandBtn>
  </div>
</template>

<script>
import ExpandBtn from "../basic/ExpandBtn.vue";
export default {
  name: "Rightbar",
  components: { ExpandBtn },
  methods: {
    closeRightbar() {
      document.getElementById("rightbar").style.transition = "0.3s";
      document.getElementById("rightbar").style.width = 0;
    },
  },
  mounted() {
    document.getElementById("rightbar").style.transition = "1s";
    document.getElementById("rightbar").style.width = "15rem";
  },
};
</script>

<style>
#rightbar {
  position: fixed;
  top: 4.8rem;
  right: 0;
  width: 0;
  height: calc(100% - 4.8rem);
  overflow-x: hidden;
  background-color: #ededed;
  transition: 0.3s;
}
</style>