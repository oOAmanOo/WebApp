<template>
    <h1 class="zh margin_add">熱門繪本</h1>
    <div class="row">
        <div class="col-sm-4" v-for="(item, index) in recommend" :key="index">
            <router-link :to="`/books?bookID=${item.id}`" style="text-decoration: none;">
                <img :src="require('../assets/image/image' + item.id + '.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'">
                <h5 class="zh">{{ item.name }}</h5>
                <h5 class="zh">{{ item.price }} 元</h5>
            </router-link>
        </div>
    </div>

    <h1 class="zh margin_add">其他繪本</h1>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="all" v-model="category" @change="filter" checked>
        <label class="btn btn-outline-primary" for="btnradio1">All</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="Comics" v-model="category" @change="filter">
        <label class="btn btn-outline-primary" for="btnradio2">Comics</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="Action" v-model="category" @change="filter">
        <label class="btn btn-outline-primary" for="btnradio3">Action</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off" value="Children's comics" v-model="category" @change="filter">
        <label class="btn btn-outline-primary" for="btnradio4">Children's comics</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off" value="Adventure Manga" v-model="category" @change="filter">
        <label class="btn btn-outline-primary" for="btnradio5">Adventure Manga</label>

        
    </div>

    <div class="row">
        <div class="col-sm-4" v-for="(item, index) in books" :key="index">
            <router-link :to="`/books?bookID=${item.id}`" style="text-decoration: none;">
                <img :src="require('../assets/image/image' + item.id + '.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'">
                <h5 class="zh">{{ item.name }}</h5>
                <h5 class="zh">{{ item.price }} 元</h5>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
    import axios from "axios";
    import { useCookies } from "vue3-cookies";
    const { cookies } = useCookies();
    const imgH = ref(window.innerHeight - 200);
    const imgW = ref(window.innerWidth / 12 * 2);

    const recommend = ref([]);
    axios.get("http://localhost:3000/recommendation")
        .then((res) => recommend.value = res.data.productInfos)
        .catch((err) => console.log(err));

    const books = ref([]);
    axios.get("http://localhost:3000/product")
            .then((res) => books.value = res.data.productInfos)
            .catch((err) => console.log(err));

    const category = ref("");
    function filter(){
        let url = "http://localhost:3000/product";

        if(category.value != "all"){
            axios.post(url, {filters: [category.value]})
                .then((res) => books.value = res.data.productInfos)
                .catch((err) => console.log(err));
        }
        else{
            axios.get("http://localhost:3000/product")
                .then((res) => books.value = res.data.productInfos)
                .catch((err) => console.log(err));
        }
        
    }
    
</script>

<style>
    .margin_add {
        margin-top: 50px;
        margin-bottom: 20px;
    }
</style>