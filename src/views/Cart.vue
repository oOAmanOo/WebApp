<template>
    <!-- <template v-if="user != null"> -->
    <template v-if="user != null">
        <div class="row justify-content-center">
            <div class="col-sm-10">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="20%"></th>
                            <th scope="col" width="20%">書名</th>
                            <th scope="col" width="20%">單價</th>
                            <th scope="col" width="20%">件數</th>
                            <th scope="col" width="20%">總價</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items">
                            <td><img :src="require('../assets/image/image' + item.id + '.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'"></td>
                            <td class="zh align-middle">{{ item.name }}</td>
                            <td class="zh align-middle">{{ item.price }}</td>
                            <td class="zh align-middle">
                                <div class="row">
                                    <div class="col-sm-4 d-flex justify-content-center"><button type="button" class="btn btn-info" @click="updateCart(item.id, -1)">-</button></div>
                                    <div class="col-sm-4 d-flex align-items-center justify-content-center">{{ item.amount }}</div>
                                    <div class="col-sm-4 d-flex justify-content-center"><button type="button" class="btn btn-info" @click="updateCart(item.id, 1)">+</button></div>
                                </div>       
                            </td>
                            <td class="zh align-middle">{{ item.amount * item.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row p-5">
            <div class="col-sm-5"></div>
            <div class="col-sm-2">
                <button type="button" class="zh btn btn-success" @click="checkout">結帳</button>
            </div>
            <div class="col-sm-5"></div>
        </div>
    </template>
    
    <template v-else>
        <h1 class="zh">請先
            <router-link to="/signup">註冊</router-link>
            或
            <router-link to="/login">登入</router-link>
        </h1>
    </template>
</template>

<script setup>
    import { useCookies } from 'vue3-cookies';
    import Swal from "sweetalert2";
    import { ref } from "vue";
    import axios from 'axios';

    const imgH = ref(window.innerHeight - 200);
    const imgW = ref(window.innerWidth / 12 * 1.5);

    // check cookie if logged in
    // const { cookies } = useCookies();
    // const user = cookies.get('user');
    // if(user != null){
    //     const account = user.account;
    //     const password = user.password;
    // }
    
    const user = "????";
    const account = "Benson0918";
    const password = "my818200";
    
    // get cart items
    const items = ref([]);
    let user_cart = "http://localhost:3000/cart/" + account;
    axios.post(user_cart, {password: password})
        .then((res) => {
            if(res.data.isSuccess == true){
                items.value = res.data.productInfos
            }
            else{
                Swal.fire({
                    title: "Empty!",
                    icon: "warning",
                    text: res.data.cause
                })
            }
        })
        .catch((err) => console.log(err))

    // update cart
    function updateCart(id, amount){
        let url = "http://localhost:3000/cart/change/" + account;
        console.log(url);
        axios.post(url, 
            {password: password,
             products: [{id: id, amount: amount}]})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

        // reload amounts
        axios.post(user_cart, {password: password})
            .then((res) => items.value = res.data.productInfos)
            .catch((err) => console.log(err))
    }

    // checkout
    function checkout(){
        let url = "http://localhost:3000/cart/submit/" + account;
        console.log(url);
        axios.post(url, {password: password})
            .then((res) => {
                if(res.data.isSuccess == true){
                    Swal.fire({
                        title: "Checkout!",
                        icon: "success"
                    }).then(function(){
                        window.location = "/home";
                    })
                }
                else{
                    Swal.fire({
                        title: "Failed!",
                        icon: "warning",
                        text: res.data.cause
                    })
                }
            })
            .catch((err) => console.log(err))
    }
</script>

<style>
    img {
        padding: 10px;
    }

    tr {
        text-align: center;
    }
</style>