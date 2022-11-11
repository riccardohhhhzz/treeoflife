<template>
  <div id="expandBtn">
    <svg-icon
      :icon-class="icon"
      class="shrinkIcon"
      class-name="shrinkIcon"
    ></svg-icon>
  </div>
</template>

<script>
export default {
  name: "ExpandBtn",
  props: ["icon"],
};
</script>

<style>
#expandBtn {
  display: flex;
  position: relative;
  align-items: center;
  width: 15rem;
  height: 4rem;
}
.shrinkIcon {
  position: absolute;
  width: 2rem;
  height: 4rem;
  vertical-align: middle;
  color: #64666d;
  right: 5%;
}
.shrinkIcon:hover {
  color: #fff;
  cursor: pointer;
}
</style>