import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from "@/views/IndexPage.vue";
import Hello from "@/views/BooksView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexPage
    },
    {
    path: '/books',
    name: 'books',
    component: books
    }
    
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
