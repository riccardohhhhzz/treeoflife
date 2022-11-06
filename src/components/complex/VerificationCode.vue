<template>
  <div>
    <div class="left">
      <input
        type="text"
        v-for="(c, index) in sixCode"
        :key="index"
        v-model="sixCode[index]"
        @input="inputCode(index)"
        @keyup.delete="deleteCode(index)"
        ref="verifyCode"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "VerificationCode",
  data() {
    return {
      sixCode: Array(6).fill(""),
    };
  },
  methods: {
    onlyOneNum(value) {
      return value.replace(/[\D]/g, "")[0];
    },
    inputCode(index) {
      // TODO: 修复输入拼音控制台报错问题(OK)
      // 原因是没有排除掉undefined和null的影响， 用一个 null || ""保证如果为
      // 空则为空字符串即可解决
      this.sixCode[index] = this.onlyOneNum(this.sixCode[index]) || "";
      if (this.sixCode[index].length !== 0 && index < 5) {
        this.$refs.verifyCode[index + 1].focus();
      }
      var verifyCode = this.sixCode.join().replace(/[,]/g, "");
      this.$emit("finished", verifyCode);
    },
    deleteCode(index) {
      if (index > 0) {
        this.$refs.verifyCode[index - 1].focus();
      }
    },
  },
  mounted() {
    this.$refs.verifyCode[0].focus();
  },
};
</script>

<style scoped>
input {
  width: 36px;
  height: 36px;
  border: 1.5px solid #cdcdcd;
  font-size: 18px;
  text-align: center;
  border-radius: 6px;
}

input:hover {
  border: 1.5px solid #cdcdcd;
}
input:focus {
  border: 1.5px solid #4dcf90;
  box-shadow: none;
  outline: none;
}
.left {
  display: flex;
  justify-content: space-between;
}
</style>