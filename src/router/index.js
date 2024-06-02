import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies';
import IndexPage from "@/views/IndexPage.vue";
import BooksView from "@/views/BooksView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import PurchaseList from "@/views/PurchaseList.vue";
import Home from "@/views/Home.vue";
import Cart from "@/views/Cart.vue";
import test from "@/views/test.vue";
import UserView from "@/views/UserView.vue";

const { cookies } = useCookies();
const routes = [
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
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!cookies.get('user'); // Check if user is authenticated
  if (to.path === '/cart' && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  }else if (to.path === '/user' && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else if (to.path === '/login' && isAuthenticated) {
    next('/home'); 
  }else if (to.path === '/signup' && isAuthenticated) {
    next('/home'); 
  }else{
    next(); // Proceed with navigation
  }
});

export default router
