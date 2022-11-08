<template>
  <div id="searchInput">
    <span style="position: relative">
      <input
        type="text"
        :placeholder="placeholder"
        v-model="str"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      />
      <svg-icon
        icon-class="clearInput"
        id="clear"
        @click.native="clearInput"
        @mouseover.native="hover = true"
        v-show="hover"
      ></svg-icon>
    </span>
    <button>
      <svg-icon icon-class="search"></svg-icon>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    placeholder: {
      type: String,
      default: "糖尿病早期症状",
    },
  },
  data() {
    return {
      str: "",
      hover: false,
    };
  },
  methods: {
    clearInput() {
      this.str = "";
    },
  },
};
</script>

<style scoped>
input {
  vertical-align: middle;
  font-size: 14px;
  height: 2rem;
  width: calc(100% - 1.2em - 2rem);
  background-color: #f7f7f7;
  outline: none;
  border: none;
  border-radius: 4px 0px 0px 4px;
  caret-color: #333;
  padding: 0 0.6em;
}
button {
  vertical-align: middle;
  height: 2rem;
  width: 2rem;
  border: none;
  border-radius: 0px 4px 4px 0px;
  background-color: #bcc1c9;
}
button:hover {
  cursor: pointer;
  background-color: #aeb4c0;
}
#clear {
  background-color: transparent;
  position: absolute;
  right: 3%;
  top: 10%;
}
</style>