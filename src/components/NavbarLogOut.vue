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
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/signup">Sign up</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Log in</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {ref} from 'vue'
const windowWidth = ref(window.innerWidth);
</script>

<style scoped>

</style>