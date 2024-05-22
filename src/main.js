import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootswatch/dist/sketchy/bootstrap.css'
import router from './router/index.js'


createApp(App)
    .use(router)
    .mount('#app')

