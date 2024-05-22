<template>
    <div class="container justify-content-center">
        <div class="row justify-content-center p-5">
            <img class="col-lg-4" :style="'max-height:'+imgHeight+'px; max-width:'+imgWidth+'px'" :src="require('../assets/image/image'+bookData['id']+'.jpg')">
            <div class="col-lg-8 text-md-start pt-2 ps-5">
                <h3>{{bookData['name']}}</h3>
                <h5 class="zh pt-3">繪本簡介{{windowHeight}}</h5>
                <p class="alert alert-dismissible alert-light">
                    {{ bookData['summary'] }}</p>
                <h5 class="zh pt-2">作者: {{bookData['author']}}</h5>
                <div class="pt-2">
                    <h5 class="zh inline-block mb-2">價格: {{bookData['price']}} /元</h5>
                    <span style="font-size: 15px" :class="'badge rounded-pill inline-block mb-2 mx-5 '+(bookData['status'] == 'Available'?'bg-success':'bg-danger')">{{ bookData['status'] }}</span>
                </div>
                <button type="button" class="btn bg-warning mt-2 text-white">Add to Cart</button>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// read test_bookData.json
import bookData_json from '../assets/test_bookData.json'
const imgHeight = ref(window.innerHeight -120)
const imgWidth = ref(window.innerWidth/12*3.5)
const bookData = JSON.parse(JSON.stringify(bookData_json))[0]
if (bookData['amount'] > 0) {
    bookData['status'] = 'Available'
} else {
    bookData['status'] = 'Sold Out'
}
</script>

<style scoped>
.inline-block {
    display: inline-flex;
}

</style>