<template>
  <!-- 自研富文本编辑器，图片操作还有一些问题，暂时弃用-->
  <div id="MyTextEditor">
    <!-- 编辑区 -->
    <div contenteditable="true" class="textEditor"></div>
    <!-- 按钮区 -->
    <div class="btns">
      <span class="text">
        <svg-icon
          icon-class="bold"
          class="icon"
          @click.native="execCommand('bold')"
        ></svg-icon>
        <svg-icon
          icon-class="italic"
          class="icon"
          @click.native="execCommand('italic')"
        ></svg-icon>
        <svg-icon
          icon-class="underline"
          class="icon"
          @click.native="execCommand('underline')"
        ></svg-icon>
      </span>
      <span class="list">
        <svg-icon
          icon-class="unorderedList"
          class="icon"
          @click.native="execCommand('insertUnorderedList')"
        ></svg-icon>
        <svg-icon
          icon-class="orderedList"
          class="icon"
          @click.native="execCommand('insertOrderedList')"
        ></svg-icon>
      </span>
      <span class="insert">
        <button class="nav-img">
          <svg-icon icon-class="img" class="icon"></svg-icon>
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            @change="insertImg"
          />
        </button>
        <svg-icon icon-class="emoji" class="icon"></svg-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTextEditor",
  data() {
    return {};
  },
  methods: {
    execCommand(name, args = null) {
      document.execCommand(name, false, args);
    },
    insertImg(e) {
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onload = () => {
        let base64Img = reader.result;
        this.execCommand("insertImage", base64Img);
        document.querySelector(".nav-img input").value = ""; // 解决同一张图片上传无效的问题
      };
      reader.readAsDataURL(file);
    },
    handleClick(e) {
      if (
        e.target &&
        e.target.tagName &&
        e.target.tagName.toUpperCase() === "IMG"
      ) {
        this.handleClickImg(e.target);
      }
    },
    handleClickImg(img) {
      this.nowImg = img;
      this.showOverlay();
    },
    showOverlay() {
      // 添加蒙层
      this.overlay = document.createElement("div");
      this.overlay.contenteditable = false;
      this.editor.appendChild(this.overlay);
      //定位蒙层和大小
      this.repositionOverlay();
    },
    repositionOverlay() {
      let imgRect = this.nowImg.getBoundingClientRect();
      let editorRect = this.editor.getBoundingClientRect();
      //设置蒙层宽高和位置
      Object.assign(this.overlay.style, {
        position: "absolute",
        top: `${imgRect.top - editorRect.top + this.editor.scrollTop}px`,
        left: `${imgRect.left - editorRect.left + this.editor.scrollLeft}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        boxSizing: "border-box",
        border: "1px dashed #333333",
      });
      // 添加四个顶点拖拽框
      this.createBox();
    },
    createBox() {
      this.boxes = [];
      this.addBox("nwse-resize"); // top left
      this.addBox("nesw-resize"); // top right
      this.addBox("nwse-resize"); // bottom right
      this.addBox("nesw-resize"); // bottom left
      this.positionBoxes(); // 设置四个拖拽框位置
    },
    addBox(cursor) {
      const box = document.createElement("div");
      Object.assign(box.style, {
        position: "absolute",
        height: "12px",
        width: "12px",
        backgroundColor: "white",
        border: "1px solid #777",
        boxSizing: "border-box",
        opacity: "0.80",
      });
      box.style.cursor = cursor;
      box.addEventListener("mousedown", this.handleMousedown); // 顺便添加事件
      this.overlay.appendChild(box);
      this.boxes.push(box);
    },
    positionBoxes() {
      let handleXOffset = `-6px`;
      let handleYOffset = `-6px`;
      [
        { left: handleXOffset, top: handleYOffset },
        { right: handleXOffset, top: handleYOffset },
        { right: handleXOffset, bottom: handleYOffset },
        { left: handleXOffset, bottom: handleYOffset },
      ].forEach((pos, idx) => {
        Object.assign(this.boxes[idx].style, pos);
      });
    },
    handleMousedown(e) {
      this.dragBox = e.target;
      this.dragStartX = e.clientX;
      this.preDragWidth = this.nowImg.width;
      this.setCursor(this.dragBox.style.cursor);
      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.handleMouseup);
    },
    handleDrag(e) {
      // 计算水平拖动距离
      const deltaX = e.clientX - this.dragStartX;
      // 修改图片大小
      if (this.dragBox === this.boxes[0] || this.dragBox === this.boxes[3]) {
        // 左边的两个框
        this.nowImg.width = Math.round(this.preDragWidth - deltaX);
      } else {
        // 右边的两个框
        this.nowImg.width = Math.round(this.preDragWidth + deltaX);
      }
      // 同时修改蒙层大小
      this.repositionOverlay();
    },
    handleMouseup() {
      this.setCursor("");
      // 拖拽结束移除事件监听
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.handleMouseup);
    },
    setCursor(value) {
      // 设置鼠标样式
      [document.body, this.nowImg].forEach((el) => {
        el.style.cursor = value;
      });
    },
  },
  mounted() {
    this.editor = document.querySelector(".textEditor");
    this.editor.addEventListener("click", this.handleClick);
  },
};
</script>

<style>
.nav-img {
  outline: none;
  border: none;
  background-color: transparent;
  position: relative;
}
.nav-img input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.textEditor {
  position: relative;
  outline: none;
  min-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 260px;
}
.textEditor li {
  list-style-position: outside;
  margin-left: 2rem;
}
.textEditor ul > li {
  text-indent: 0;
}
.btns {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid #979797;
}
.btns span {
  display: flex;
  width: 3.5rem;
  justify-content: space-between;
  margin-left: 2rem;
}
.btns .icon {
  vertical-align: middle;
  user-select: none;
  width: 1.3rem;
  height: 1.3rem;
  color: #444444;
}
.btns .text {
  margin-left: 1rem;
}
.btns .text .icon {
  width: 1.2rem;
  height: 1.2rem;
}
.btns .text {
  width: 5rem;
}
.btns .icon:hover {
  color: #000;
  cursor: pointer;
}
</style>