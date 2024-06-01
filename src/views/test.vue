<template>
    <button @click="test">test</button>
</template>

<script>
export default {
  data() {
    return {
      // cookie 的資料
      account: this.$cookies.get('user').account,
      password: this.$cookies.get('user').password,
    };
  },
  methods: {
    test() {
      console.log(this.account);
      console.log(this.password);
    }
  }}

</script>

<style scoped>

</style>