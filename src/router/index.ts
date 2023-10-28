import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/auth/LoginView.vue';
import ProfesionalView from '../views/menu/ProfesionalView.vue'
import PatientView from '../views/menu/PatientView.vue'
import QuestionView from '../views/menu/QuestionView.vue'
import HomeView from '../views/menuPatents/HomeView.vue'
import InfoPatientView from '../views/menuPatents/InfoPatientView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/profesionals',
    name: 'profesionals',
    component: ProfesionalView
  },
  {
    path: '/patients',
    name: 'patients',
    component: PatientView
  },
  {
    path: '/questions',
    name: 'questions',
    component: QuestionView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/info_patient',
    name: 'info_patient',
    component: InfoPatientView
  },


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
