import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from "@/views/IndexPage.vue";
import BooksView from "@/views/BooksView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/books',
    name: 'books',
    component: BooksView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
