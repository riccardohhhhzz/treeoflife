<template>
  <div class="selectTime">
    <MySelect
      class="display-inline-block"
      :arr="optionalDate.years"
      inputType="year"
      unit="年"
      :width="yearWidth"
      :updateValue="updateSelectDate"
      :defaultValue="
        defaultValue === null ? null : defaultValue['year'].toString()
      "
      @blur="sendMessage"
    ></MySelect>
    <MySelect
      class="display-inline-block"
      :arr="optionalDate.months"
      inputType="month"
      unit="月"
      :width="monthWidth"
      :updateValue="updateSelectDate"
      :defaultValue="
        defaultValue === null ? null : defaultValue['month'].toString()
      "
      @blur="sendMessage"
    ></MySelect>
    <MySelect
      class="display-inline-block"
      :arr="optionalDateDays"
      inputType="day"
      unit="日"
      :width="dayWidth"
      :updateValue="updateSelectDate"
      :defaultValue="
        defaultValue === null ? null : defaultValue['day'].toString()
      "
      @blur="sendMessage"
    ></MySelect>
  </div>
</template>

<script>
import MySelect from "../basic/MySelect.vue";
export default {
  name: "TimeSelect",
  components: { MySelect },
  props: {
    yearWidth: {
      type: String,
      default: "80px",
    },
    monthWidth: {
      type: String,
      default: "70px",
    },
    dayWidth: {
      type: String,
      default: "70px",
    },
    defaultValue: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      optionalDate: {
        years: Array.from({ length: 100 }, (v, k) => 2022 - k),
        months: Array.from({ length: 12 }, (v, k) => k + 1),
      },
      selectDate: {
        year: null,
        month: null,
        day: null,
      },
      // 数组长度为13位，让month与index对齐，语义化更好
      monthDays: [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  },
  computed: {
    // 根据所选年份和月份判断该月天数
    optionalDateDays() {
      if (this.selectDate.year === null || this.selectDate.month === null) {
        return Array.from({ length: 31 }, (v, k) => k + 1);
      }
      var year = parseInt(this.selectDate.year);
      var month = parseInt(this.selectDate.month);
      var isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
      if (isLeapYear) {
        this.monthDays[2] = 29;
      } else {
        this.monthDays[2] = 28;
      }
      return Array.from({ length: this.monthDays[month] }, (v, k) => k + 1);
    },
  },
  methods: {
    updateSelectDate(inputType, newValue) {
      switch (inputType) {
        case "year":
          this.selectDate.year = newValue;
          break;
        case "month":
          this.selectDate.month = newValue;
          break;
        case "day":
          this.selectDate.day = newValue;
          break;
        default:
          break;
      }
    },
    sendMessage() {
      this.$emit("update", this.selectDate);
    },
  },
};
</script>

<style scoped>
.selectTime {
  display: flex;
  justify-content: space-between;
}
</style>