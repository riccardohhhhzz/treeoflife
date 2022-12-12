<template>
  <div id="info-form">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <h4 v-if="subtitle" class="subtitle">{{ subtitle }}</h4>
    <IconBtn
      v-if="showEditBtn"
      class="edit-btn"
      icon="edit"
      iconWidth="24px"
    ></IconBtn>
    <slot></slot>
  </div>
</template>

<script>
import IconBtn from "../basic/IconBtn.vue";
export default {
  name: "InfoForm",
  components: { IconBtn },
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    showEditBtn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
#info-form {
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 25px;
}
.title {
  font-size: 20px;
  font-weight: 500;
  color: #333333;
}
.subtitle {
  margin-top: 15px;
  font-size: 14px;
  font-weight: 500;
  color: #888888;
}
.edit-btn {
  position: absolute;
  top: 22px;
  right: 25px;
  width: 30px;
  height: 30px;
  border: 1px solid #999999;
}
.edit-btn:hover {
  background-color: #e6e6e6;
}
</style>