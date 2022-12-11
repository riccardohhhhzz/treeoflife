<template>
  <div id="info-form">
    <h2 v-if="title" class="title">{{ title }}</h2>
    <h4 v-if="subtitle" class="subtitle">{{ subtitle }}</h4>
    <EditBtn v-if="showEditBtn" class="edit-btn"></EditBtn>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import EditBtn from "../basic/EditBtn.vue";
export default {
  name: "InfoForm",
  components: { EditBtn },
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
}
.content {
  margin-top: 20px;
}
</style>