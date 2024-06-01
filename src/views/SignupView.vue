<template>
  <div class="signup container justify-content-center p-5 mt-5">
    <h1>Sign up</h1>
    <form @submit.prevent="submitForm">
    <div :class="accountClass">
      <label for="account">Account</label>
      <input type="text" id="account" placeholder="最少六碼，且至少包含各一數字與英文字母" v-model="account" @blur="accountTouched = true" :class="inputClass(accountClass)" required>
      <div class="invalid-feedback" v-if="accountTouched && !isAccountValid">帳號至少要包含一個英文和數字，且長度至少為六位數</div>
    </div>
    
    <div :class="passwordClass">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="最少六碼，且至少包含各一數字與英文字母" v-model="password" @blur="passwordTouched = true" :class="inputClass(passwordClass)" required>
      <div class="invalid-feedback" v-if="passwordTouched && !isPasswordValid">密碼至少要包含一個英文和數字，且長度至少為六位數</div>
    </div>
    
    <span>會員基本資料</span>
    
    <div :class="userClass">
      <label for="username">User name</label>
      <input type="text" id="username" placeholder="Enter name" v-model="username" :class="inputClass(userClass)" required>
    </div>
    
    <div :class="emailClass">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="example@example.com" v-model="email" @blur="emailTouched = true" :class="inputClass(emailClass)" required>
      <div class="invalid-feedback" v-if="emailTouched && !isEmailValid">請輸入有效的電子郵件地址</div>
    </div>
    
    <div :class="phoneClass">
      <label for="phonenum">Phone number</label>
      <input type="text" id="phonenum" placeholder="09xxxxxxxx" v-model="phonenum" @blur="phoneTouched = true" :class="inputClass(phoneClass)" required>
      <div class="invalid-feedback" v-if="phoneTouched && !isPhoneValid">電話號碼必須以09開頭，且總長度為10位數字</div>
    </div>
    
    <div :class="addressClass">
      <label for="address">Address</label>
      <input type="text" id="address" placeholder="Enter address" v-model="address" :class="inputClass(addressClass)" required>
    </div>

    <button type="submit">Sign up</button>
    
    <div class="login-prompt">
      <span>Already have an account?</span>
      <router-link to="/login">Log in</router-link>
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
      password: '',
      username: '',
      email: '',
      phonenum: '',
      address: '',
      accountTouched: false,
      passwordTouched: false,
      emailTouched: false,
      phoneTouched: false,
    };
  },
  computed: {
    isAccountValid() {
      const accountRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      return accountRegex.test(this.account);
    },
    isPasswordValid() {
      // 6碼以上 限制至少包含一英和數字
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; 
      return passwordRegex.test(this.password);
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPhoneValid() {
      // 09xxxxxxxx
      const phoneRegex = /^09\d{8}$/;
      return phoneRegex.test(this.phonenum);
    },
    accountClass() {
      return this.account ? (this.isAccountValid ? 'has-success' : 'has-danger') : '';
    },
    userClass() {
      return this.username ? 'has-success' : '';
    },  
    passwordClass() {
      return this.password ? (this.isPasswordValid ? 'has-success' : 'has-danger') : '';
    },
    emailClass() {
      return this.email ? (this.isEmailValid ? 'has-success' : 'has-danger') : '';
    },
    phoneClass() {
      return this.phonenum ? (this.isPhoneValid ? 'has-success' : 'has-danger') : '';
    },
    addressClass() {
      return this.address ? 'has-success' : '';
    }
  },
  methods: {
    inputClass(validationClass) {
      return validationClass === 'has-success' ? 'form-control is-valid' : validationClass === 'has-danger' ? 'form-control is-invalid' : '';
    },
    submitForm(event) {
      event.preventDefault();    
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^09\d{8}$/;
      
      if (!passwordRegex.test(this.password)) {
        // password check
        alert('密碼至少要包含一個英文和數字，且長度至少為六位數');
        return;
      } else if (!passwordRegex.test(this.account)){
        // account check
        alert('帳號至少要包含一個英文和數字，且長度至少為六位數');
        return;
      }else if (!emailRegex.test(this.email)) {
        alert('請輸入有效的電子郵件地址');
        return;
      } else if (!phoneRegex.test(this.phonenum)) {
        alert('電話號碼必須以09開頭，且總長度為10位數字');
        return;
      }  else if(this.username === '' || this.email === '' || this.phonenum === '' || this.address === '') {
        // other fields validation
        alert('請填寫完整會員基本資料');
        return;
      }else{
        const hashP = this.hashPassword(this.password) //改在後端hash
        this.signup(this.account, hashP, this.username, this.email, this.phonenum, this.address)

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
        if(result.isSuccess){
          this.$router.push('/login')
        }else{
          alert('帳號已存在');
        }
      }catch(error){
        console.log('Error storing user:', error);
      }
    },

    hashPassword(password) {
      return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    }
    // hashPassword(password){
    //   const bcrypt = require('bcryptjs');
    //   const saltRounds = 5;
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
div{
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