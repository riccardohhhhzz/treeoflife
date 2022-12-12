<template>
  <div id="info-item">
    <h3 class="property-name">{{ propertyName }}</h3>
    <h3 v-if="propertyValue">{{ propertyValue }}</h3>
    <LinkText v-if="!propertyValue" :showUnderLine="false">点击添加</LinkText>
  </div>
</template>

<script>
import LinkText from "../text/LinkText.vue";
export default {
  name: "InfoItem",
  components: { LinkText },
  props: {
    propertyName: {
      type: String,
    },
    propertyValue: {
      type: String,
    },
  },
};
</script>

<style scoped>
#info-item {
  display: flex;
}
h3 {
  color: #333333;
  font-weight: 500;
  font-size: 16px;
}
.property-name {
  width: 150px;
}
</style>