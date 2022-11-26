<template>
  <div id="select-mood">
    <p class="title">今天我感到...</p>
    <div class="moods-list">
      <span v-for="(item, index) in moods" :key="item['content']" @click="selectMood(item)" class="mood" :style="{'opacity':item['opacity']}">
        <svg-icon :icon-class="item['icon']" class="mood-icon"></svg-icon>
        <p class="select-mood-content">
            <p class="mood-content">{{ item["content"] }}</p>
            <svg-icon icon-class="select" class="icon-select" v-show="item['selected']"></svg-icon>    
        </p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectMood",
  data() {
    return {
      moods: [
        { icon: "very-happy", content: "愉悦", selected: false, opacity: 0.5 },
        { icon: "happy", content: "开心", selected: false, opacity: 0.5 },
        { icon: "netural", content: "平静", selected: false, opacity: 0.5 },
        { icon: "bad", content: "郁闷", selected: false, opacity: 0.5 },
        { icon: "very-bad", content: "难受", selected: false, opacity: 0.5 },
      ],
    };
  },
  methods: {
    selectMood(selectMood) {
      for (var m of this.moods) {
        if (m["content"] != selectMood["content"]) {
          m["selected"] = false;
          m["opacity"] = 0.5;
        } else {
          m["selected"] = true;
          m["opacity"] = 1;
        }
      }
    },
  },
};
</script>

<style scoped>
#select-mood {
  height: 80px;
  display: flex;
  align-items: center;
}
.title {
  float: left;
  margin: 0px 50px;
  color: #333333;
}
.moods-list {
  float: left;
  display: flex;
  width: 400px;
  justify-content: space-between;
}
.mood {
  width: 52px;
}
.mood:hover {
  cursor: pointer;
}
.mood-icon {
  width: 2rem;
  height: 2rem;
}
.mood-content {
  font-size: 14px;
  color: #333333;
  float: left;
  margin-left: 2px;
}
.icon-select {
  width: 1rem;
  height: 1rem;
  float: left;
  margin-left: 5px;
}
</style>