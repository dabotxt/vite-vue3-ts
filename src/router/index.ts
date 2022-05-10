import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupRouterGuard } from './guard'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/page1.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/page2',
    name: 'Page2',
    component: () => import('../views/page2.vue'),
    meta: {
      title: 'Page2'
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
setupRouterGuard(router)
export default router