<template>
    <div class="container card border-dark my-3" :style="'max-width: '+windowHeight+'px' ">
        <div class="zh card-header">歷史購買紀錄</div>
        <div v-for="(book, index) in bookData"
             :class="'row p-4 bg-white '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')">
            <img class="col-2" :src="require('../assets/image/image'+book['id']+'.jpg')">
            <div class="col-10 p-2">
                <h4 class="card-title" style="text-align: left">{{ book['name'] }}</h4>
                <div v-if="!hasComment">
                    <div :class="'inline-block '+(index == (Object.keys(bookData).length-1)?'pt-1':'pt-3')">
                        star
                        <img v-for="(star) in stars"
                             :src="require('../assets/star'+(rating >= star?'':'_empty')+'.png')"
                             style="height: 30px;" alt="">
                    </div>
                    <p class="card-text pt-2">Some quick example text to build on the card title and make up the bulk of
                        the
                        card's content.</p>
                    <!--                <h4 class="card-title " style="text-align: right">- Dark card title</h4>-->
                </div>
                <div v-if="hasComment">
                    <button class="btn btn-secondary disabled" :style="'width: '+windowHeight-50+'px' " type="button">You have already commented this picture book</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bookData_json from "@/assets/test_bookData.json";

const {ref} = require('vue')
const windowHeight = ref(window.innerHeight) * 0.8
const bookData = JSON.parse(JSON.stringify(bookData_json))
const hasComment = ref(true)
</script>

<style scoped>

</style>