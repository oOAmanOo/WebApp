<template>
    <div :style="'min-height:'+windowWidth+'px'">
      <component :is="navbarComponent" @logout="handleLogout"></component >
      <router-view @login="handleLogin" @logout="handleLogout"/>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import Navbar from "@/components/Navbar.vue";
import NavbarLogOut from "@/components/NavbarLogOut.vue";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const user = cookies.get('user');
const navbarComponent = ref(user ? Navbar : NavbarLogOut);
const windowWidth = ref(window.innerWidth)

const handleLogin = () => {
    navbarComponent.value = Navbar;
}

const handleLogout = () => {
    navbarComponent.value = NavbarLogOut;
} 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.zh {
    font-family: 'Noto Sans TC', sans-serif;
}
</style>
