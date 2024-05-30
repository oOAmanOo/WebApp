<template>
    <template v-if="cookie != ''">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">書名</th>
                    <th scope="col">單價</th>
                    <th scope="col">件數</th>
                    <th scope="col">總價</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img :src="require('../assets/image/image205.jpg')" :style="'max-height:'+imgH+'px; max-width:'+imgW+'px'"></td>
                    <td class="zh align-middle">Column content</td>
                    <td class="zh align-middle">Column content</td>
                    <td class="zh align-middle">Column content</td>
                    <td class="zh align-middle">Column content</td>
                </tr>
            </tbody>
        </table>

        <div class="row">
            <div class="col-sm-5"></div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-success">結帳</button>
            </div>
            <div class="col-sm-5"></div>
        </div>
    </template>
    
    <template v-else>
        <h1 class="zh">請先註冊或登入</h1>
    </template>
</template>

<script setup>
    // check cookie if logged in
    const cookie = "1111";
    import { ref } from "vue";
    const imgH = ref(window.innerHeight - 350);
    const imgW = ref(window.innerWidth / 12);

    const checkout = () => {

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