<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="container card border-dark my-3 " :style="'max-width: '+windowWidth+'px' ">
        <div class="zh card-header">歷史購買紀錄</div>
        <div v-if="!PurchaseList"
             :class="'row p-4 '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')">
            <h4 class="card-title" style="text-align: center">Haven't bought any book yet.</h4>
            <h4 class="card-title" style="text-align: center">Hope you find a nice book~</h4>
        </div>
        <div v-for="(book, index) in PurchaseList"
             :class="'row p-4 bg-white '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')">
            <div class="col-2 " ><img style="width:100%" :src="require('../assets/image/image'+book['id']+'.jpg')"></div>
            
            <div class="col-10 p-2 ">
                <h4 class="card-title" style="text-align: left">{{ book['name'] }}</h4>
                <div class="pt-2 " style="text-align: left">
                    <h5 class="zh pt-2  '+(windowHeight > 550?'inline-block':'')">作者: {{ book['author'] }}</h5>
                    <h5 :class="'zh mb-2  '+(windowHeight > 550?'inline-block':'')">價格: {{ book['price'] }}
                        /元</h5>
                </div>
                <div class="accordion-header" id="headingOne">
                    <button v-if="book['isComment']" class="btn btn-secondary disabled mt-2 w-75 "
                            :style="'width: '+windowWidth-50+'px' " type="button">
                        You have already commented this picture book
                    </button>
                    <button v-if="!book['isComment']" class="btn btn-success mt-2 w-75 " data-bs-toggle="modal" data-target="#commentModal"
                            :style="'width: '+windowWidth-50+'px' " type="button" @click="commentClick(index)">
                        Write your comment
                    </button>
                    <button v-if="book['justComment']" class="btn btn-warning disabled mt-2 w-75 "
                            :style="'width: '+windowWidth-50+'px' " type="button">
                        Thank you for your comment
                    </button>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script setup>
import bookData_json from "@/assets/test_bookData.json";
import axios from "axios";
import {onMounted} from "vue";
import Swal from "sweetalert2";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const {ref} = require('vue')
const windowHeight = ref(window.innerHeight)
const windowWidth = ref(window.innerWidth *0.8)
const imgWidth = ref(window.innerWidth/6)
const imgHeight = ref(window.innerHeight - 300)
const starHeight = ref(20)
const bookData = JSON.parse(JSON.stringify(bookData_json))
const hasComment = ref(true)
let account = null
let password = null
const PurchaseList = ref([])
const rating = [1, 2, 3, 4, 5]
const present_rating = ref(0)
const present_Comment = ref('')
const commenting = ref(false)

const getPurchaseListData = async () => {
    axios.post('http://localhost:3000/purchased/' + account, {
        password: password
    }).then((response) => {
        let PurchaseListData = JSON.parse(JSON.stringify(response.data))
        console.log(PurchaseListData)
        if (PurchaseListData.isSuccess) {
            PurchaseList.value = PurchaseListData.productInfos
            console.log(PurchaseList.value)
        } else {
            if (PurchaseListData.cause == 'Wrong account or password.') {
                Swal.fire({
                    icon: 'warning',
                    title: 'Please login first',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = '/login'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: cartData.cause,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }).catch((error) => {
        PurchaseList.value = null
    });
}

const commentClick = (index) => {
    if(index == -1){
        commenting.value = false
        return
    }
    commenting.value = true
    console.log(commenting.value)
    if(PurchaseList.value[index]['present_rating'] !== null){
        present_rating.value = PurchaseList.value[index]['present_rating']
    }else{
        present_rating.value = 0
        PurchaseList.value[index]['present_rating'] = 0
    }
    if(PurchaseList.value[index]['present_Comment'] !== null){
        present_Comment.value = PurchaseList.value[index]['present_Comment']
    }else{
        present_Comment.value = ''
        PurchaseList.value[index]['present_Comment'] = ''
    }
}

const ratingClick = (star) => {
    present_rating.value = star
}

const commentSubmit = () => {
    PurchaseList.value[index]['justComment'] = 1
    commenting.value = false
}

onMounted(() => {
    window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight
        windowWidth.value = window.innerWidth * 0.8
        
        imgWidth.value = window.innerWidth / 6
        imgHeight.value = window.innerHeight /3
    })
    console.log(cookies.get('user') === null);
    if (cookies.get('user') !== null) {
        // account.value = 'null'
        // password.value = 'null'
        account = 'Alice123'
        password = 'alicepassword'
    } else {
        account = cookies.get('user').account
        password = cookies.get('user').password
    }
    getPurchaseListData()
})
</script>

<style scoped>

</style>