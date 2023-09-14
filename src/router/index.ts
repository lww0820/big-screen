import { createRouter, createWebHistory } from 'vue-router'
import BigScreen from '../views/BigSreen/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/big-screen'
    },
    {
      path: '/big-screen',
      name: 'bigscreen',
      component: BigScreen
    }
  ]
})

export default router
