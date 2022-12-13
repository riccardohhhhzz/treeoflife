<template>
  <div id="todo-list">
    <div class="list-title">
      <h2>任务推荐</h2>
      <h2>
        <font>{{ finishedTaskNum }}</font
        >/{{ todolist.length }}
      </h2>
    </div>
    <div class="divide-line"></div>
    <div class="list-box">
      <TodoListItem
        v-for="(item, idx) in todolist"
        :key="item.taskName"
        :task="item.taskName"
        :icon="item.icon"
        :accentColor="item.accentColor"
        :leaves="item.leaves"
        :finished="item.finished"
        :isFirst="item.isFirst"
        :isLast="item.isLast"
      ></TodoListItem>
    </div>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";
export default {
  name: "TodoList",
  components: { TodoListItem },
  data() {
    return {
      todolist: [
        {
          taskName: "签到",
          icon: "sign-in",
          accentColor: "#F5622B",
          leaves: 5,
          finished: false,
          isFirst: true,
          isLast: false,
        },
        {
          taskName: "日记记录",
          icon: "diary",
          accentColor: "#D03A6E",
          leaves: 20,
          finished: false,
          isFirst: false,
          isLast: false,
        },
        {
          taskName: "完善个人信息",
          icon: "personal-info",
          accentColor: "#66BEFD",
          leaves: 50,
          finished: false,
          isFirst: false,
          isLast: true,
        },
      ],
    };
  },
  computed: {
    finishedTaskNum() {
      var num = 0;
      for (var todo of this.todolist) {
        if (todo.finished) {
          num++;
        }
      }
      return num;
    },
  },
};
</script>

<style scoped>
#todo-list {
  margin: 0 10px;
  margin-top: 20px;
  width: 14rem;
}
.list-title {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.list-title h2 {
  color: #64666d;
  font-size: 20px;
  font-weight: 500;
}
.list-title font {
  color: #5fbc8e;
}
.divide-line {
  width: 100%;
  height: 2px;
  border-bottom: 2px solid #cccccc;
  margin-top: 5px;
  margin-bottom: 10px;
}
.list-box {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>