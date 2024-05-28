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
                <button type="button" class="btn bg-warning mt-2 text-white" @click="addToCart">Add to Cart</button>
            </div>
        </div>
        <div class="container card border-dark mb-3" :style="'max-width: '+commentWidth+'px' ">
            <div class="zh card-header">讀者評論</div>
            <div v-for="(comment, index) in commentData" :class="(index == (Object.keys(commentData).length-1)?'card-body':'card-header')">
<!--                <h4 class="card-title " style="text-align: left">Dark card title</h4>-->
                <div :class="'inline-block '+(index == (Object.keys(commentData).length-1)?'pt-1':'pt-3')">
                    <img v-for="(star) in stars" :src="require('../assets/star'+(rating >= star?'':'_empty')+'.png')" style="height: 30px;" alt="">
                </div>
                <p class="card-text pt-2">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
<!--                <h4 class="card-title " style="text-align: right">- Dark card title</h4>-->
                
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// read test_bookData.json
import bookData_json from '../assets/test_bookData.json'
import Swal from "sweetalert2";
import axios from "axios";
const imgHeight = ref(window.innerHeight -120)
const imgWidth = ref(window.innerWidth/12*3.5)
const commentWidth = ref(window.innerWidth*0.8)
const bookData = JSON.parse(JSON.stringify(bookData_json))[0]
if (bookData['amount'] > 0) {
    bookData['status'] = 'Available'
} else {
    bookData['status'] = 'Sold Out'
}
const commentData = JSON.parse(JSON.stringify(bookData_json))
const rating = 3
const stars = [1,2,3,4,5]

const addToCart = () => {
    axios.post('http://localhost:3000/cart', {
        book_id: bookData['id'],
        book_name: bookData['name'],
        book_price: bookData['price'],
        book_amount: 1
    }).then( (response) => Swal.fire({
        icon: 'success',
        title: 'Add to Cart Successfully',
        showConfirmButton: false,
        timer: 1500
    })).catch( (error) => Swal.fire({
        icon: 'error',
        title: 'Fail to Add to Cart',
        showConfirmButton: false,
        timer: 1500
    }));
    
}
</script>

<style scoped>
.inline-block {
    display: inline-flex;
}

</style>