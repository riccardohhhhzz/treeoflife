<template>
  <div class="mydialog" v-show="showDialog">
    <div class="dialog-mask"></div>
    <div class="dialog-body">
      <h4 class="dialog-title">{{ options.title }}</h4>
      <p class="dialog-content">{{ options.content }}</p>
      <div class="dialog-btns">
        <MyButton
          v-if="options.showSecondaryBtn"
          bgColor="#DC6154"
          hoverColor="#d05042"
          :width="80"
          :height="40"
          :fontSize="16"
          @click.native="clickSecondaryBtn"
          >{{ options.secondaryBtnContent }}</MyButton
        >
        <MyButton
          :width="80"
          :height="40"
          :fontSize="16"
          @click.native="clickMainBtn"
          >{{ options.mainBtnContent }}</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
export default {
  name: "MyDialog",
  components: { MyButton },
  data() {
    return {
      showDialog: false,
      options: {
        title: "",
        content: "",
        mainBtnContent: "",
        secondaryBtnContent: "",
        showSecondaryBtn: true,
        mainBtnClickHandler: () => {},
        secondaryBtnClickHandler: () => {},
      },
    };
  },
  methods: {
    openDialog(options) {
      this.options = options;
      this.$nextTick(() => {
        this.showDialog = true;
      });
    },
    closeDialog() {
      this.showDialog = false;
    },
    clickSecondaryBtn() {
      this.options.secondaryBtnClickHandler();
      this.closeDialog();
    },
    clickMainBtn() {
      this.options.mainBtnClickHandler();
      this.closeDialog();
    },
  },
  mounted() {
    this.$bus.$on("openDialog", this.openDialog);
    this.$bus.$on("closeDialog", this.closeDialog);
  },
  beforeDestroy() {
    this.$bus.$off("openDialog");
    this.$bus.$off("closeDialog");
  },
};
</script>

<style>
.dialog-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.6;
  background-color: black;
  bottom: 0;
  left: 0;
  z-index: 200;
}
.dialog-body {
  position: fixed;
  width: calc(400px - 50px);
  height: calc(220px - 50px);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 10px;
  z-index: 201;
}
.dialog-title {
  color: #333333;
  font-size: 20px;
  font-weight: 500;
}
.dialog-content {
  color: #666666;
  font-size: 18px;
  margin-top: 35px;
}
.dialog-btns {
  display: flex;
  position: absolute;
  right: 25px;
  bottom: 25px;
  gap: 10px;
}
</style>