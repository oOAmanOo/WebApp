import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from "@/views/IndexPage.vue";
import BooksView from "@/views/BooksView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import PurchaseList from "@/views/PurchaseList.vue";
import Home from "@/views/Home.vue";
import Cart from "@/views/Cart.vue";
import test from "@/views/test.vue";

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
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/purchase',
    name: 'PurchaseList',
    component: PurchaseList
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
