<template>
    <nav class="navbar navbar-expand-lg bg-primary" :style="'position=absolute; top=0;width='+windowWidth" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand ps-2" href="/" >
                <img src="../assets/pibo.png" style="height: 60px; padding: 0px">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li :class="'nav-item ' + (windowWidth > 990?'':'border-bottom border-top')">
                        <router-link to="/purchase" class="">
                            <img v-if="windowWidth > 990" src="../assets/list.png" alt="cart" style="height: 60px">
                            <h5 v-else class="text-white p-2 mt-1">History</h5>
                        </router-link>
                    </li>
                    <li :class="'nav-item '+(windowWidth > 990?'':'border-bottom')">
                        <router-link to="/user" class="">
                            <img v-if="windowWidth > 990" src="../assets/user.png" alt="cart" style="height: 60px">
                            <h5 v-else class="text-white p-2 mt-1">User</h5>
                        </router-link>
                    </li>
                    <li :class="'nav-item '+(windowWidth > 990?'':'border-bottom')">
                        <router-link to="/cart" class="">
                            <img v-if="windowWidth > 990" src="../assets/cart.png" alt="cart" style="height: 60px">
                            <h5 v-else class="text-white p-2 mt-1">Cart</h5>
                        </router-link>
                    </li>
                    <li :class="'mr-5 nav-item '+(windowWidth > 990?'':'border-bottom')">
                        <img v-if="windowWidth > 990" src="../assets/signout.png" alt="cart" style="height: 60px"  @click="logout">
                        <h5 v-else class="text-white p-2 mt-1"  @click="logout">Log Out</h5>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {onMounted, ref} from 'vue'

import router from "@/router";
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();
const emit = defineEmits(['logout'])
const windowWidth = ref(window.innerWidth);

const logout = () => {
    if(cookies.get('user')){
        cookies.remove('user')
        emit('logout'); // emit event to App.vue
    }
    if(router.currentRoute.value.path ==='/'){
        window.location.reload()
    }else{
        router.push('/');
    }
    
}

onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth;
    })
})
</script>

<style scoped>

</style>