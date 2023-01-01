<template>
  <div id="todo-list-item" :style="styleVar" @click="clickItem">
    <div class="icon-box" :style="styleVar">
      <svg-icon :icon-class="icon" class="task-icon"></svg-icon>
    </div>
    <div class="content">
      <p class="task-name">{{ task }}</p>
      <div class="leaf-award">
        <p class="leaf-award-num">+{{ leaves }}</p>
        <svg-icon icon-class="leaf" class="leaf-icon"></svg-icon>
      </div>
    </div>
    <div class="tail-icon">
      <svg-icon
        v-if="!finished"
        icon-class="bold-arrow"
        class="goto-icon"
      ></svg-icon>
      <svg-icon
        v-if="finished"
        icon-class="select"
        class="finished-icon"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: {
    icon: {
      type: String,
    },
    task: {
      type: String,
    },
    accentColor: {
      type: String,
      default: "#f5622b",
    },
    leaves: {
      type: Number,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      type: Boolean,
    },
    isLast: {
      type: Boolean,
    },
    clickHandler: {
      type: Function,
    },
  },
  computed: {
    itemBorderRadius() {
      if (this.isFirst) {
        return "6px 6px 0 0";
      } else if (this.isLast) {
        return "0 0 6px 6px";
      } else {
        return null;
      }
    },
    styleVar() {
      return {
        "--accentColor": this.accentColor,
        "--border-bottom": this.isLast ? null : "1px solid #cccccc",
        "--border-radius": this.itemBorderRadius,
      };
    },
  },
  methods: {
    clickItem() {
      this.clickHandler();
    },
  },
};
</script>

<style scoped>
#todo-list-item {
  display: flex;
  position: relative;
  align-items: center;
  padding: 10px 20px;
  border-bottom: var(--border-bottom);
  border-radius: var(--border-radius);
}
#todo-list-item:hover {
  cursor: pointer;
  background-color: #f7f7f7;
}
.icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--accentColor);
  border-radius: 4px;
  margin-right: 15px;
}
.icon-box .task-icon {
  width: 28px;
  height: 28px;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.task-name {
  color: #686868;
  font-size: 14px;
}
.leaf-award-num {
  color: #5fbc8e;
  font-size: 12px;
}
.leaf-award {
  display: flex;
  margin-top: 2px;
}
.leaf-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 2px;
}
.tail-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 12px;
  width: 20px;
  height: 20px;
  margin: auto 0;
}
.goto-icon {
  width: 20px;
  height: 20px;
  color: #cccccc;
}
.finished-icon {
  width: 20px;
  height: 20px;
}
</style>