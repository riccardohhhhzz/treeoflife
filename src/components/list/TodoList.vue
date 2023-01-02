<template>
  <div id="todo-list">
    <div class="list-title">
      <h2>任务推荐</h2>
      <h2>
        <font>{{ finishedTaskName.length }}</font
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
        :clickHandler="item.clickHandler"
      ></TodoListItem>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var signInContents = [
  "发光并非太阳的专利，你也可以发光。",
  "纵有疾风起，人生不言弃。",
  "面对光明，阴影就在我们身后。",
  "每一个不曾起舞的日子，都是对生命的辜负。",
  "青春是有限的，智慧是无穷的，趁短的青春，去学习无穷的智慧。",
  "再长的路，一步步也能走完；再短的路，不迈开双脚也无法到达。",
  "欲望以提升热忱，毅力以磨平泰山。",
  "不怕千万人阻挡，只怕自己投降。",
  "不同的人生，有不同的幸福。",
  "梦想，不在于拥有，而在于追求。",
];
import TodoListItem from "./TodoListItem.vue";
import { SessionUtils } from "@/utils";
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
          clickHandler: this.signIn,
        },
        {
          taskName: "日记记录",
          icon: "diary",
          accentColor: "#D03A6E",
          leaves: 20,
          finished: false,
          isFirst: false,
          isLast: false,
          clickHandler: this.openDiary,
        },
        {
          taskName: "完善个人信息",
          icon: "personal-info",
          accentColor: "#66BEFD",
          leaves: 50,
          finished: false,
          isFirst: false,
          isLast: true,
          clickHandler: this.editPersonalInfo,
        },
      ],
    };
  },
  computed: {
    finishedTaskName() {
      let tasks = [];
      for (const todo of this.todolist) {
        if (todo.finished) {
          tasks.push(todo.taskName);
        }
      }
      return tasks;
    },
  },
  methods: {
    initTasks() {
      axios({
        url: "/userinfo/task/update",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: this.$store.state.userAbout.userInfo.username,
          finishedTasks: [],
        },
      }).then((res) => {
        const data = res.data;
        if (data.state === 200) {
          SessionUtils.set("user", data.data);
        }
      });
    },
    finishTask(taskName) {
      const task = this.todolist.find((todo) => todo.taskName === taskName);
      const credit = task.leaves;
      const username = this.$store.state.userAbout.userInfo.username;
      task.finished = true;
      axios({
        url: "/userinfo/task/update",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: {
          username: username,
          finishedTasks: this.finishedTaskName,
        },
      }).then((res) => {
        const data = res.data;
        if (data.state === 200) {
          axios({
            url: "/userinfo/credit/add",
            headers: { "Content-Type": "application/json" },
            method: "post",
            params: {
              username: this.$store.state.userAbout.userInfo.username,
              credit: credit,
            },
          }).then((res) => {
            const data = res.data;
            if (data.state === 200) {
              SessionUtils.set("user", data.data);
              this.$bus.$emit("updateCredit", credit);
            }
          });
        }
      });
    },
    signIn() {
      const dialogOptions = {
        title: "签到成功",
        content:
          signInContents[Math.floor(Math.random() * signInContents.length)],
        mainBtnContent: "确认",
        mainBtnClickHandler: () => {
          this.finishTask("签到");
        },
      };
      this.$bus.$emit("openDialog", dialogOptions);
    },
    openDiary() {
      console.log("日记记录");
    },
    editPersonalInfo() {
      console.log("完善个人信息");
    },
  },
  mounted() {
    const finishedTasks = this.$store.state.userAbout.userInfo.finishedTasks;
    if (!finishedTasks || finishedTasks.length === 0) {
      return;
    }
    for (const todo of this.todolist) {
      if (finishedTasks.indexOf(todo.taskName) >= 0) {
        todo.finished = true;
      }
    }
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