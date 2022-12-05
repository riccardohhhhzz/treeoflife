<template>
  <div id="more-btn">
    <svg-icon
      icon-class="more"
      class="icon"
      :style="moreBtnStyleVar"
      @click.native="showContext = !showContext"
    ></svg-icon>
    <div class="context" v-show="showContext" id="context">
      <a
        v-for="(title, index) in itemTitleList"
        :key="index"
        @click="clickItemList[index]"
      >
        <svg-icon
          :icon-class="itemIconList[index]"
          class="item-icon"
        ></svg-icon>
        <h4 class="item-title">{{ title }}</h4>
      </a>
    </div>
    <div class="mask" v-show="showContext" @click="clickOutSide"></div>
  </div>
</template>

<script>
export default {
  name: "MoreBtn",
  props: {
    itemIconList: {
      type: Array,
    },
    itemTitleList: {
      type: Array,
    },
    clickItemList: {
      type: Array,
    },
  },
  computed: {
    moreBtnStyleVar() {
      return {
        "--color": this.showContext ? "#374047" : "#999999",
      };
    },
  },
  data() {
    return {
      showContext: false,
    };
  },
  methods: {
    clickOutSide() {
      this.showContext = false;
    },
  },
};
</script>

<style scoped>
#more-btn {
  position: relative;
}
.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color);
}
.icon:hover {
  color: #374047;
  cursor: pointer;
}
.context {
  position: absolute;
  z-index: 3;
  width: 8rem;
  right: 0;
  border: 1px solid #d1d2d4;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 8, 0.25);
}
.context a {
  display: flex;
  align-items: center;
  padding: 4px;
}
.context a:hover {
  background-color: #d1d2d4;
  cursor: pointer;
}
.item-icon {
  float: left;
  color: #999999;
  vertical-align: middle;
}
.item-title {
  float: left;
  margin-left: 8px;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  vertical-align: middle;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background-color: transparent;
}
</style>