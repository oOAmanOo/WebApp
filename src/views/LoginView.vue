<template>
  <div class="login">
    <h1>Log in</h1>
    <form @submit.prevent="submitForm">
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
export default {
  data() {
    return {
      account: '',
      password: ''
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      this.login(this.account, this.password)
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
        console.log(result);
        const user = { account:account,password:result.password};
        this.$cookies.set('user', user);
        this.$router.push('/')
      }else{
        console.log(result.isSuccess);
        alert('帳號或密碼錯誤');
      }
    },

    hashPassword(password){
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      try{
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashP = bcrypt.hashSync(password, salt);
        return hashP;
      } catch (error){
        console.log('Error hashing password:', error);
      }
    },
  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
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