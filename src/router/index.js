import { createRouter, createWebHistory } from 'vue-router';
import Home from '/src/App.vue';
import LoginView from '../views/Login.vue';
import Register from '../views/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home-page',
      name: 'homePage',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/user-type',
      name: 'userType',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Registration/RegistrationUserType.vue')
    }
  ]
})

export default router
