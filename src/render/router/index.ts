import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
