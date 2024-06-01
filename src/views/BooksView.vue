<template>
    <div v-if="bookData" class="container justify-content-center pb-5">
        <div class="row justify-content-center p-5">
            <img class="col-lg-4" :style="'max-height:'+imgHeight+'px; max-width:'+imgWidth+'px'"
                 :src="require('../assets/image/image'+bookData['id']+'.jpg')">
            <div :class="'col-lg-8 text-md-start pt-2 '+(windowHeight > 550?'ps-5':'')">
                <h3>{{ bookData['name'] }}</h3>
                <h5 class="zh pt-3">繪本簡介</h5>
                <p class="alert alert-dismissible alert-light">
                    {{ bookData['summary'] }}</p>
                <h5 class="zh pt-2">作者: {{ bookData['author'] }}</h5>
                <div class="pt-2">
                    <h5 :class="'zh mb-2 '+(windowHeight > 550?'inline-block':'')">價格: {{ bookData['price'] }}
                        /元</h5>
                    <span style="font-size: 15px" :class="'badge rounded-pill '+(windowHeight > 550?'inline-block  mb-2 mx-5 ':'')+''+(bookData['status'] == 'Available'?'bg-success':'bg-danger')">{{ bookData['status']}}</span>
                </div>
                <div>
                    <input type="number" class="form-control w-25 inline-block" v-model="cart_amount" @change="priceCompute">
                    <input type="text" disabled class="form-control ms-2 w-25 inline-block border-0 text-center" :value="total + ' 元'">
                    <button class="btn btn-warning mx-2 inline-block zh" @click="addToCart">加入購物車</button>
                </div>
                
            </div>
        </div>
        <div class="container card border-dark mb-3" :style="'max-width: '+commentWidth+'px' ">
            <div class="zh card-header">讀者評論</div>
            <div v-if="commentData">
                <div v-for="(commentkey, index) in Object.keys(commentData)"
                     :class="'bg-white '+((index == Object.keys(commentData).length-1)?'card-body':'card-header')">
                    <div :class="'inline-block '+(index == (Object.keys(commentData).length-1)?'pt-1':'pt-3')">
                        <img v-for="(star) in rating" 
                             :src="require('../assets/star'+(star <= commentData[commentkey][0]?'':'_empty')+'.png')"
                             :style="'height: '+ starHeight+'px'" class="p-0" alt="">
                    </div>
                    <p class="card-text pt-2">{{commentData[commentkey][1]}}</p>
                    <h4 class="card-title " style="text-align: right">- {{ commentkey }}</h4>
                </div>
            </div>
            <div v-if="!commentData">
                <div class="'bg-white card-body">
                    <p class="card-text text-danger">No one has evercomment yet. Buy one to comment!</p>
                </div>
            </div>
                
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import { useCookies } from 'vue3-cookies';
import Swal from "sweetalert2";
import axios from "axios";

// get windowHeight for style
const windowHeight = ref(window.innerHeight)
const imgHeight = ref(window.innerHeight - 120)
const imgWidth = ref(window.innerWidth / 12 * 3.5)
const commentWidth = ref(window.innerWidth * 0.8)
const starHeight = ref(window.innerHeight /24)
// get data
const route = useRoute()
const bookId = route.query.bookID
const bookData = ref(null)
const commentData = ref(null)
const rating = [1, 2, 3, 4, 5]
const cart_amount = ref(0)
const total = ref(0)
// get cookies data
const { cookies } = useCookies();
let account = null
let password = null


const getBookData = async () => {
    try {
        let getProduct = await axios.get('http://localhost:3000/product/' + bookId)
        let data = JSON.parse(JSON.stringify(getProduct.data))
        if(data.isSuccess){
            bookData.value = data.productInfos[0]
            if (bookData.value['amount'] > 0) {
                bookData.value['status'] = 'Available'
            } else {
                bookData.value['status'] = 'Sold Out'
            }
        }else{
            console.log('Get Book Data error!')
        }
    } catch (e) {
        console.log(e)
    }
}
const getCommentData = async () => {
    try {
        let getComment = await axios.get('http://localhost:3000/comment/' + bookId)
        let data = JSON.parse(JSON.stringify(getComment.data))
        if(data.isSuccess && Object.keys(data.comments).length != 0){
            commentData.value = data.comments
        }else if(Object.keys(data.comments).length == 0){
            commentData.value = false
        }else{
            console.log('Get Comment Data error!')
        }
    } catch (e) {
        console.log(e)
    }
}

const priceCompute = () => {
    total.value = parseInt(cart_amount.value) * parseInt(bookData.value['price'])
}

const addToCart = () => {
    if (cart_amount.value == 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter a positive number',
            showConfirmButton: false,
            timer: 1500
        })
        return
    }
    
    axios.post('http://localhost:3000/cart/change/'+account, {
        password: password,
        products: [
            {
                "id": bookData.value['id'],
                "amount": cart_amount.value
            }
        ]
    }).then((response) => {
        let cartData = JSON.parse(JSON.stringify(response.data))
        if (cartData.isSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Add to Cart Successfully',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            if(cartData.cause == 'Wrong account or password.') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Please login first',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/login'
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: cartData.cause,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }).catch((error) => Swal.fire({
        icon: 'error',
        title: 'Network Error!',
        showConfirmButton: false,
        timer: 1500
    }));
}

onMounted(() => {
    window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight
        imgHeight.value = window.innerHeight - 120
        imgWidth.value = window.innerWidth / 12 * 3.5
        commentWidth.value = window.innerWidth * 0.8
        starHeight.value = window.innerHeight / 12 / 3
    })
    
    if(cookies.get('user') == null){
        console.log(cookies.get('user') == null)
        account = 'no login'
        password = 'no login'
    }else{
        console.log(cookies.get('user'))
        account = cookies.get('user').account
        password = cookies.get('user').password
    }
    getBookData();
    getCommentData();
})

watch(() => cart_amount.value, () => {
    if (cart_amount.value < 0) {
        cart_amount.value = 0
        Swal.fire({
            icon: 'warning',
            title: 'Please enter a positive number',
            showConfirmButton: false,
            timer: 1500
        })
    }
})



</script>

<style scoped>
.inline-block {
    display: inline-flex;
}

</style>