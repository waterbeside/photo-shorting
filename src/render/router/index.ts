import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<any> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/preview/:uid',
    name: 'PreviewPic',
    component: () => import('../views/PreviewPic.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
