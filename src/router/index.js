import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from "@/views/IndexPage.vue";
import BooksView from "@/views/BooksView.vue";
import PurchaseList from "@/views/PurchaseList.vue";

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
        path: '/purchase',
        name: 'PurchaseList',
        component: PurchaseList
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
