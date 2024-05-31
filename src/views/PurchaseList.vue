<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style="">
                <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
    </div>
    
<!--    <div class="container card border-dark my-3 accordion" :style="'max-width: '+windowHeight+'px' " id="accordionPurchase">-->
<!--        <div class="zh card-header">歷史購買紀錄</div>-->
<!--        <template v-for="(book, index) in PurchaseList">-->
<!--            <div :class="'accordion-item row p-4 bg-white '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')" >-->
<!--                <img class="col-2" :src="require('../assets/image/image'+book['id']+'.jpg')">-->
<!--                <div class="col-10 p-2 ">-->
<!--                    <h4 class="card-title" style="text-align: left">{{ book['name'] }}</h4>-->
<!--                    <div class="pt-2 " style="text-align: left">-->
<!--                        <h5 class="zh pt-2  '+(windowHeight > 550?'inline-block':'')">作者: {{ book['author'] }}</h5>-->
<!--                        <h5 :class="'zh mb-2  '+(windowHeight > 550?'inline-block':'')">價格: {{ book['price'] }}-->
<!--                            /元</h5>-->
<!--                    </div>-->
<!--                    <div class="accordion-header" id="headingOne">-->
<!--                        <button v-if="book['isComment']" class="btn btn-secondary disabled mt-2 w-75 "-->
<!--                                :style="'width: '+windowHeight-50+'px' " type="button">-->
<!--                            You have already commented this picture book-->
<!--                        </button>-->
<!--                        <button v-if="!book['isComment']" class="accordion-button mt-2 w-75 "-->
<!--                                :style="'width: '+windowHeight-50+'px' " type="button" data-bs-toggle="collapse"-->
<!--                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">-->
<!--                            Accordion Item #1-->
<!--                        </button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div id="collapseOne"-->
<!--                 :class="'accordion-collapse collapse row p-4  '+(index == (Object.keys(bookData).length-1)?'card-body':'card-header')"-->
<!--                 class="" aria-labelledby="headingOne" data-bs-parent="#accordionPurchase" style="">-->
<!--                <div class="accordion-body">-->
<!--                    <div >-->
<!--                        <button class="btn btn-secondary disabled mt-2 w-75 " :style="'width: '+windowHeight-50+'px' "-->
<!--                                type="button">Write your comment-->
<!--                        </button>-->
<!--                        <div class="inline-block pt-3">-->
<!--                            <div class="inline-block pt-3">-->
<!--                                <img v-for="(star) in rating"-->
<!--                                     :src="require('../assets/star'+(star <= present_rating?'':'_empty')+'.png')"-->
<!--                                     :style="'height: '+ starHeight+'px'" class="p-0" alt="" @click="ratingClick(star)">-->
<!--                            </div>-->
<!--                            <textarea class="form-control card-text pt-2" id="exampleTextarea" rows="3"-->
<!--                                      spellcheck="false" v-model="present_Comment"></textarea>-->
<!--                        </div>-->
<!--                        <textarea class="form-control" id="exampleTextarea" rows="3" spellcheck="false"></textarea>-->
<!--                        <p class="card-text pt-2">Some quick example text to build on the card title and make up the-->
<!--                            bulk of-->
<!--                            the-->
<!--                            card's content.</p>-->
<!--                        &lt;!&ndash;                <h4 class="card-title " style="text-align: right">- Dark card title</h4>&ndash;&gt;-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </template>-->
<!--    </div>-->
</template>

<script setup>
import bookData_json from "@/assets/test_bookData.json";
import axios from "axios";
import cookie from "vue-cookies";
import {onMounted} from "vue";
import Swal from "sweetalert2";

const {ref} = require('vue')
const windowHeight = ref(window.innerHeight) * 0.8
const starHeight = ref(20)
const bookData = JSON.parse(JSON.stringify(bookData_json))
const hasComment = ref(true)
// const account = cookie.get('account')
const account = 'Alice123'
const PurchaseList = ref(null)
const rating = [1, 2, 3, 4, 5]
const present_rating = ref(0)
const present_Comment = ref('')
const getPurchaseListData = async () => {
    axios.post('http://localhost:3000/purchased/' + account, {
        // password: cookie.get('password')
        password: 'alicepassword'
    }).then((response) => {
        let PurchaseListData = JSON.parse(JSON.stringify(response.data))
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
                    title: 'cartData.cause',
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

const ratingClick = (star) => {
    present_rating.value = star
}

const collapseClick = () => {
    commentOpen.value = !commentOpen.value
}

onMounted(() => {
    window.addEventListener('resize', () => {
        windowHeight.value = window.innerHeight
    })
    getPurchaseListData()
})
</script>

<style scoped>

</style>