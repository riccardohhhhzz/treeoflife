<template>
  <div id="quill-editor" :style="styleVar">
    <quill-editor v-model="content" :options="editorOption"></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import quillEmoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";
Quill.register("modules/imageExtend", ImageExtend);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

// 定制toolbar
const toolbarOptions = [
  ["bold", "italic", "underline"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  ["link", "emoji"], // 链接、表情包、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "QuillEditor",
  components: { quillEditor },
  props: {
    minHeight: {
      type: String,
      default: "100px",
    },
    maxHeight: {
      type: String,
      default: "150px",
    },
    defaultContent: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      content: this.defaultContent,
      editorOption: {
        theme: "snow",
        placeholder: "输入你想说的话...",
        modules: {
          "emoji-toolbar": true,
          "emoji-shortname": true,
          toolbar: {
            //工具栏配置
            container: toolbarOptions,
            handlers: {},
          },
          imageResize: {
            displayStyles: {
              backgroundColor: "white",
              border: "none",
              color: "#979797",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"], // Resize 允许缩放， DisplaySize 缩放时显示像素 Toolbar 显示工具栏
          },
        },
      },
    };
  },
  computed: {
    styleVar() {
      return {
        "--minHeight": this.minHeight,
        "--maxHeight": this.maxHeight,
      };
    },
  },
};
</script>

<style>
.ql-editor {
  min-height: var(--minHeight);
  max-height: var(--maxHeight);
  font-size: 16px;
}
</style>