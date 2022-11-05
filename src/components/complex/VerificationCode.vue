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
      sixCode: Array(6).fill(null),
    };
  },
  methods: {
    onlyOneNum(value) {
      return value.replace(/\D/g, "")[0];
    },
    inputCode(index) {
      this.sixCode[index] = this.onlyOneNum(this.sixCode[index]);
      if (this.sixCode[index] !== undefined && index < 5) {
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