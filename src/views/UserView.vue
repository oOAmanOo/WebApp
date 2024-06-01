<template>
    <div class="container justify-content-center pb-5">
        <div class="row justify-content-center p-4">
            <h1>User Profile</h1>
        </div>
        <div class="row justify-content-start">
            <div class="avatar col-sm-6">
                <div class="card">
  <h3 class="card-header">ME</h3>
  <img :src="require('../assets/avatar.png')" alt="Dinosaur Icon" class="profile-img"/>
                </div>
            </div>
            <div class="info col-sm-6 my-5 px-5 ">
                <div v-if="personalInfos">
      <div  v-for="(value, key) in personalInfos" :key="key" class="d-flex align-items-center mb-2">
            <h2 class="mx-2 mb-0">{{ key }}:</h2>
            <p class="mb-0">{{ value }}</p>
      </div>
    </div>
    <p v-else>No user information available.</p>
    <button type="button" class="btn btn-danger my-5" @click="logout">Log out</button> 
            </div>
            
        </div>
    </div>

</template>

<script setup>

import { useCookies } from 'vue3-cookies';
import router from '../router';
const { cookies } = useCookies();
const account = cookies.get('user').account;
const password = cookies.get('user').password;
const personalInfos = cookies.get('user').personalInfos;
const emit = defineEmits(['logout'])

const logout = () => {
    cookies.remove('user');
    router.push('/');
    emit('logout'); // emit event to App.vue
}
</script>

<style scoped>
.card {
  overflow: hidden;
  max-width: 500px;
  text-align: center;
  margin: auto;
}

.profile-img {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.info{
    text-align: left
}

p{
    font-size: 1.2rem;
}
</style>