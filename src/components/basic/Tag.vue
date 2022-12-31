<template>
  <div id="tag">
    <div
      class="non-edit-state"
      v-show="!editState"
      @mouseover="hover = true"
      @mouseleave="hover = false"
      @dblclick="enterEditState"
    >
      <p>{{ editedContent }}</p>
      <IconBtn
        v-show="hover"
        class="del-icon"
        icon="clearInput"
        iconWidth="14px"
        iconColor="#fff"
        @click.native="delTag"
      ></IconBtn>
    </div>
    <input
      class="tag-text-input"
      ref="tagTextInput"
      type="text"
      v-show="editState"
      @blur="exitEditState"
      @keydown="keydownEvent"
      v-model="editedContent"
    />
  </div>
</template>

<script>
import IconBtn from "./IconBtn.vue";
export default {
  name: "Tag",
  components: { IconBtn },
  props: {
    nonEditedContent: {
      type: String,
    },
  },
  data() {
    return {
      hover: false,
      editState: false,
      editedContent: this.nonEditedContent,
    };
  },
  methods: {
    keydownEvent(e) {
      // 按下回车键
      if (e.keyCode === 13) {
        this.$refs["tagTextInput"].blur();
      }
    },
    enterEditState() {
      this.editState = true;
      this.$nextTick(() => {
        var textInputDom = this.$refs["tagTextInput"];
        textInputDom.focus();
        textInputDom.select();
      });
    },
    exitEditState() {
      this.editState = false;
      this.$bus.$emit(
        "modifyTagContent",
        this.nonEditedContent,
        this.editedContent
      );
    },
    delTag() {
      this.$bus.$emit("delTag", this.editedContent);
    },
  },
};
</script>

<style scoped>
.non-edit-state {
  position: relative;
  height: 20px;
  width: max-content;
  font-size: 14px;
  color: #666666;
  padding: 5px 12px;
  background-color: #e6e6e6;
  border-radius: 6px;
}
.del-icon {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 16px;
  height: 16px;
  background-color: #dc6154;
  border-radius: 16px;
}
.tag-text-input {
  outline: none;
  width: 66px;
  height: 16px;
  border: 1.5px solid #4dcf90;
  border-radius: 6px;
  padding: 5px 6px;
  font-size: 14px;
  color: #666666;
}
</style>