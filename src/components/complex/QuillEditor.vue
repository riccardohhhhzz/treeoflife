<template>
  <div id="quill-editor">
    <quill-editor v-model="content" :options="editorOption"></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageExtend", ImageExtend);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

// 定制toolbar
const toolbarOptions = [
  ["bold", "italic", "underline"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  ["link", "image"], // 链接、图片、视频-----['link', 'image', 'video']
];
export default {
  name: "QuillEditor",
  components: { quillEditor },
  data() {
    return {
      content: "",
      editorOption: {
        theme: "snow",
        placeholder: "输入你想说的话...",
        modules: {
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
};
</script>

<style>
.ql-editor {
  min-height: 100px;
  max-height: 150px;
}
</style>