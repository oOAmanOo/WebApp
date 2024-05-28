<template>
  <div class="login">
    <h1>Log in</h1>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required>
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
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      // 6碼以上 限制至少包含一英和數字
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      if (!passwordRegex.test(this.password)) {
        alert('密碼至少要包含一個英文和數字，且長度至少為六位數');
        return;
      } else if (!passwordRegex.test(this.username)){
        alert('帳號至少要包含一個英文和數字，且長度至少為六位數');
        return;
      } else{
        //TODO: 這裡應該要呼叫API來驗證帳號密碼
        alert('Login success');
        const hashP = this.hashPassword(this.password)
        this.storeUser(this.username, hashP)
        //this.storeUser(this.username, this.password)
      }
      // console.log('Username:', this.username);
      // console.log('Password:', this.password);
    },

    storeUser(username, password){
      const user = { username:username,password:password};
      this.$cookies.set('user', user);
      console.log(this.$cookies.get('user').username);
      console.log(this.$cookies.get('user').password);
    },

    hashPassword(password){
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      try{
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashP = bcrypt.hashSync(password, salt);
        console.log(password);
        console.log(hashP);
        return hashP;
      } catch (error){
        console.log('Error hashing password:', error);
      }
      
      //
      // Load hash from your password DB.
      // bcrypt.compareSync(myPlaintextPassword, hash); // true
      // bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
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