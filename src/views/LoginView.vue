<template>
  <div class="login container justify-content-center p-5 mt-5 mb-5">
    <h1>Log in</h1>
    <form @submit.prevent="submitForm" class="">
      <label for="account">Account:</label>
      <input type="text" id="account" v-model="account" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Log in</button>
      <div class="signup-prompt">
        <span>Don’t have an account?</span>
        <router-link to="/signup">Sign Up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    async submitForm(event) {
      try {
        event.preventDefault();
        const hashP = this.hashPassword(this.password);
        await this.login(this.account, hashP)
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },

    async login(account, password){
      const server = 'http://localhost:3000';
      const response = await fetch(`${server}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password })
      });

      const result = await response.json();
      if(result.isSuccess){
        // store user in cookies
        const user = { account:account,password:result.password, personalInfos: result.personalInfos};
        this.$cookies.set('user', user);
        this.$router.push('/')
        this.$emit('login'); // emit event to App.vue
      }else{
        alert('帳號或密碼錯誤');
      }
    },
    hashPassword(password) {
        return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    },
  }
}
</script>

<style scoped>
.login {
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-bottom: 20px;
}

button{
  margin-bottom: 20px;
}

.signup-prompt span {
  margin-right: 10px;
}

</style>