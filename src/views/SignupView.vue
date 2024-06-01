<template>
  <div class="signup container justify-content-center p-5 mt-5">
    <h1>Sign up</h1>
    <form @submit.prevent="submitForm">
      <label for="account">Account</label>
      <input type="text" id="account" placeholder="最少六碼，且至少包含各一數字與英文字母" v-model="account" required>
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="最少六碼，且至少包含各一數字與英文字母" v-model="password" required>
      
      <span>會員基本資料</span>
      <label for="username">User name</label>
      <input type="username" id="username" placeholder="Enter name" v-model="username" required>
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Enter email" v-model="email" required>
      <label for="phonenum">Phone number</label>
      <input type="phonenum" id="phonenum" placeholder="Enter phone number" v-model="phonenum" required>
      <label for="address">Address</label>
      <input type="address" id="address" placeholder="Enter address" v-model="address" required>

      <button type="submit">Sign up</button>
      <div class="login-prompt">
        <span>Already have an account?</span>
        <router-link to="/login">Log in</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: '',
      password: '',
      username: '',
      email: '',
      phonenum: '',
      address: ''
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();    
      // 6碼以上 限制至少包含一英和數字
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

      if (!passwordRegex.test(this.password)) {
        // password check
        alert('密碼至少要包含一個英文和數字，且長度至少為六位數');
        return;
      } else if (!passwordRegex.test(this.account)){
        // account check
        alert('帳號至少要包含一個英文和數字，且長度至少為六位數');
        return;
      } else if(this.username === '' || this.email === '' || this.phonenum === '' || this.address === '') {
        // other fields validation
        alert('請填寫完整會員基本資料');
        return;
      }else{
        //const hashP = this.hashPassword(this.password) //改在後端hash
        this.signup(this.account, this.password, this.username, this.email, this.phonenum, this.address)

      }
    },

    async signup(account, password, username, email, phonenum, address){
      const server = 'http://localhost:3000'

      // call API sotre user in DB
      try{
        const response = await fetch(`${server}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ account, password, username, email, phonenum, address })
        });
        const result = await response.json();
        console.log(result);
        if(result.isSuccess){
          this.$router.push('/login')
        }else{
          console.log(result.isSuccess);
          alert('帳號已存在');
        }
      }catch(error){
        console.log('Error storing user:', error);
      }
    },

    // hashPassword(password){
    //   const bcrypt = require('bcryptjs');
    //   const saltRounds = 10;
    //   try{
    //     const salt = bcrypt.genSaltSync(saltRounds);
    //     const hashP = bcrypt.hashSync(password, salt);
    //     console.log(password);
    //     console.log(hashP);
    //     return hashP;
    //   } catch (error){
    //     console.log('Error hashing password:', error);
    //   }
    // },
  }
}
</script>

<style scoped>
.signup {
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

.login-prompt span {
  margin-right: 10px;
}
</style>