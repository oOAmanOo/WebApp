import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/dist/sketchy/bootstrap.css'
import router from './router/index.js'
import VueCookies from 'vue3-cookies'

createApp(App)
    .use(router)
    .use(VueCookies)
    .mount('#app') 