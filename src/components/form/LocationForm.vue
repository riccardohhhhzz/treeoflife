<template>
  <InfoForm
    title="位置"
    :showEditBtn="true"
    @clickEditBtn="openEditLocationForm"
  >
    <div class="edit-location">
      <InfoItem
        v-for="(item, idx) in properties"
        :key="item.name"
        :propertyName="item.name"
        :propertyValue="item.value"
        @clickAdd="openEditLocationForm"
      ></InfoItem>
    </div>
    <EditLocationForm></EditLocationForm>
  </InfoForm>
</template>

<script>
import InfoForm from "./InfoForm.vue";
import InfoItem from "../basic/InfoItem.vue";
import EditLocationForm from "./EditLocationForm.vue";
export default {
  name: "LocationForm",
  components: { InfoForm, InfoItem, EditLocationForm },
  data() {
    return {
      properties: [
        { name: "国家", value: "中国" },
        {
          name: "地区/省份",
          value: this.$store.state.userAbout.userInfo.province,
        },
        { name: "城市", value: this.$store.state.userAbout.userInfo.city },
        {
          name: "邮政编码",
          value:
            this.$store.state.userAbout.userInfo.postcode === 0
              ? null
              : this.$store.state.userAbout.userInfo.postcode.toString(),
        },
      ],
    };
  },
  methods: {
    openEditLocationForm() {
      this.$bus.$emit("openEditLocationForm");
    },
  },
};
</script>

<style scoped>
.edit-location {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>