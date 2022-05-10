import { Router } from 'vue-router'

export const setupRouterGuard = (router: Router) => {
  router.beforeEach((to, from, next) => {
    // @ts-ignore
    document.title = to.meta.title
    console.log(to.meta.title)
    next()
  })
}
