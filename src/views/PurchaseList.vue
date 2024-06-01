<template>
    <div class="container card border-dark my-3 " :style="'max-width: '+windowWidth+'px' ">
        <div class="zh card-header">歷史購買紀錄</div>
        <div v-if="!PurchaseList"
             :class="'row p-4 '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')">
            <h4 class="card-title" style="text-align: center">Haven't bought any book yet.</h4>
            <h4 class="card-title" style="text-align: center">Hope you find a nice book~</h4>
        </div>
        <div v-for="(book, index) in PurchaseList"
             
             :class="'row p-4 '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')">
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
                        Thanks you for your comment
                    </button>
                    <button v-if="!book['isComment']" class="btn btn-success mt-2 w-75 " data-bs-toggle="modal" data-bs-target="#exampleModal" 
                            :style="'width: '+windowWidth-50+'px' " type="button" @click="commentClick(index)">
                        Write your comment
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="inline-block pt-1 ps-4">
                        <img v-for="(star) in rating"
                             :src="require('../assets/star'+(star <= present_rating?'':'_empty')+'.png')"
                             :style="'height: '+ starHeight+'px'" class="p-0" @click="ratingClick(star)">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <textarea class="form-control mt-3" rows="3" v-model="present_Comment" :placeholder="commentPlaceholder"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="commentSubmit">Post Comment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import bookData_json from "@/assets/test_bookData.json";
import axios from "axios";
import {onMounted, watch} from "vue";
import Swal from "sweetalert2";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const {ref} = require('vue')
const windowHeight = ref(window.innerHeight)
const windowWidth = ref(window.innerWidth *0.8)
const imgWidth = ref(window.innerWidth/6)
const imgHeight = ref(window.innerHeight - 300)
const starHeight = ref(50)
const bookData = JSON.parse(JSON.stringify(bookData_json))
const hasComment = ref(true)
let account = null
let password = null
const PurchaseList = ref([])
const rating = [1, 2, 3, 4, 5]
const present_index = ref(-1)
const present_bookID = ref(-1)
const present_rating = ref(0)
const present_Comment = ref('')
const commentPlaceholder = ref('')

const getPurchaseListData = async () => {
    axios.post('http://localhost:3000/purchased/' + account, {
        password: password
    }).then((response) => {
        let PurchaseListData = JSON.parse(JSON.stringify(response.data))
        if (PurchaseListData.isSuccess) {
            PurchaseList.value = PurchaseListData.productInfos
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Please login first',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/login'
            })
        }
    }).catch((error) => {
        PurchaseList.value = null
    });
}

const commentClick = (index) => {
    present_index.value = index
    present_bookID.value = PurchaseList.value[index]['id']
    commentPlaceholder.value = 'I think that "' + PurchaseList.value[index]['name'] + '" is ...'
    if(PurchaseList.value[index]['present_rating'] === undefined){
        present_rating.value = []
        PurchaseList.value[index]['present_rating'] = 0
        
    }else{
        present_rating.value = PurchaseList.value[index]['present_rating']
    }
    if(PurchaseList.value[index]['present_Comment'] === undefined){
        present_Comment.value = ''
        PurchaseList.value[index]['present_Comment'] = ['']
    }else{
        present_Comment.value = PurchaseList.value[index]['present_Comment']
    }
}

const ratingClick = (star) => {
    present_rating.value = star
}

const commentSubmit = () => {
    if(present_rating.value <= 0){
        Swal.fire({
            icon: 'warning',
            title: 'Please give a rating from 1 to 5',
            showConfirmButton: false,
            timer: 1500
        })
        return
    }
    if (present_Comment.value === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Please enter your comment',
            showConfirmButton: false,
            timer: 1500
        })
        return
    }
    
    axios.post('http://localhost:3000/comment/' + account + '/' + present_bookID.value, {
        rating : present_rating.value,
        comment: present_Comment.value
    }).then((response) => {
        let writeCommentData = JSON.parse(JSON.stringify(response.data))
        if (writeCommentData.isSuccess) {
            PurchaseList.value[present_index.value]['isComment'] = true
            Swal.fire({
                icon: 'success',
                title: 'Your comment is on the book\'s page now',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/books/?bookID='+PurchaseList.value[present_index.value]['id']
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: writeCommentData.cause,
                showConfirmButton: false,
                timer: 1500
            })
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
        windowWidth.value = window.innerWidth * 0.8
        
        imgWidth.value = window.innerWidth / 6
        imgHeight.value = window.innerHeight /3
    })
    if (cookies.get('user') === null) {
        account.value = 'null'
        password.value = 'null'
    } else {
        account = cookies.get('user').account
        password = cookies.get('user').password
    }
    getPurchaseListData()
})

watch(() => present_rating.value, () => {
    if(PurchaseList.value[present_index.value]['present_rating'] != undefined){
        PurchaseList.value[present_index.value]['present_rating'] = present_rating.value
    }
})
watch(() => present_Comment.value, () => {
    if(PurchaseList.value[present_index.value]['present_Comment'] != undefined){
        PurchaseList.value[present_index.value]['present_Comment'] = present_Comment.value
    }
})
</script>

<style scoped>

</style>


