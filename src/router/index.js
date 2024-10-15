import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { ref } from 'vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import BookList from '@/components/BookList.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'
export const isAuthenticated = ref(false)

const router = createRouter({
  history: createWebHistory(process.env.whaowei - library),
  routes: [
    {
      path: '/WeatherCheck',
      name: 'WeatherCheck',
      component: WeatherView
    },
    {
      path: '/GetAllBookAPI',
      name: 'GetAllBookAPI',
      component: GetAllBookAPI
    },
    {
      path: '/CountBookAPI',
      name: 'CountBookAPI',
      component: CountBookAPI
    },
    {
      path: '/booklist',
      name: 'BookList',
      component: BookList
    },
    {
      path: '/FirebaseLogin',
      name: 'FirebaseLogin',
      component: FirebaseSigninView
    },
    {
      path: '/FirebaseRegister',
      name: 'FirebaseRegister',
      component: FirebaseRegisterView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/access-denied',
      name: 'AccessDenied',
      component: AccessDeniedView
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBookView
    },
    {
      path: '/GetBookCount',
      name: 'GetBookCount',
      component: GetBookCountView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
