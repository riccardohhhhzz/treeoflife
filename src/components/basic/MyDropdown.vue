<template>
  <div id="mydropdown">
    <button class="dropbtn" @click="showContent = !showContent">
      <p class="droptitle">{{ title }}</p>
      <svg-icon
        icon-class="dropdown_white"
        style="vertical-align: middle"
      ></svg-icon>
    </button>
    <div class="dropdown-content" v-if="showContent">
      <a
        v-for="(item, index) in itemList"
        :key="index"
        @click="clickItemList[index]"
        >{{ item }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    title: {
      type: String,
    },
    itemList: {
      type: Array,
    },
    clickItemList: {
      type: Array,
    },
  },
  data() {
    return {
      showContent: false,
    };
  },
  methods: {
    clickItem() {
      console.log("asdasd");
      this.showContent = false;
    },
  },
};
</script>

<style scoped>
#mydropdown {
  position: relative;
  outline: none;
}
.dropbtn {
  height: 2.4rem;
  width: 6.8rem;
  background-color: #df6153;
  border: none;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  padding-left: 4px;
  cursor: pointer;
}
.dropbtn:hover {
  background-color: #d05042;
}
.droptitle {
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
}
.dropdown-content {
  display: block;
  position: absolute;
  top: 3.6rem;
  right: 0;
  width: 8rem;
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 8, 0.25);
}
.dropdown-content a {
  display: block;
  height: 1.8rem;
  line-height: 1.8rem;
  border-radius: 4px;
  padding: 0 1rem;
  color: #333;
  cursor: default;
}
.dropdown-content a:hover {
  background-color: #53cf91;
  color: #fff;
}
</style>