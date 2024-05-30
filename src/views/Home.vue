<template>
    <h1 class="zh margin_add">熱門繪本</h1>
    <div class="row">
        <div class="col-sm-4" v-for="(item, index) in recommend" :key="index">
                <img :src="require('../assets/image/image' + item.id + '.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'">
                <h5 class="zh">{{ item.name }}</h5>
                <h5 class="zh">{{ item.price }} 元</h5>
        </div>
    </div>

    <h1 class="zh margin_add">其他繪本</h1>

    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="all" @change="filter('all')" checked>
        <label class="btn btn-outline-primary" for="btnradio1">所有繪本</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="travel" @change="filter('travel')">
        <label class="btn btn-outline-primary" for="btnradio2">旅遊</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" value="business" @change="filter('business')">
        <label class="btn btn-outline-primary" for="btnradio3">商業</label>
    </div>

    <div class="row">
        <div class="col-sm-4" v-for="(item, index) in books" :key="index">
            <img :src="require('../assets/image/image' + item.id + '.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'">
            <h5 class="zh">{{ item.name }}</h5>
            <h5 class="zh">{{ item.price }} 元</h5>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import axios from "axios";
    const imgH = ref(window.innerHeight - 250);
    const imgW = ref(window.innerWidth / 12 * 1.5);

    const recommend = ref([]);
    axios.get("http://localhost:3000/recommendation")
        .then((res) => recommend.value = res.data.productInfos)
        .catch((err) => console.log(err));

    const books = ref([]);
    axios.get("http://localhost:3000/product")
            .then((res) => (books.value = res.data.productInfos))
            .catch((err) => console.log(err));

    function filter(type){
        let url = "http://localhost:3000/product";
        if(type != "all"){
            url += "?category=" + type;
        }
        console.log(url);
        axios.get(url)
            .then((res) => (books.value = res.data.productInfos))
            .catch((err) => console.log(err));
    }
</script>

<style>
    .margin_add {
        margin-top: 50px;
        margin-bottom: 20px;
    }
</style>