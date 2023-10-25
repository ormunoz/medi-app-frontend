import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue';
// import HomeView from '../views/home/HomeView.vue'
// import PruebaView from '../views/home/PruebaView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  // {
  //   path: '/prueba',
  //   name: 'prueba',
  //   component: PruebaView
  // },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
