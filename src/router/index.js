import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'

Vue.use(Router)
// 路由配置
const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  // window.document.title = to.meta.title;
  next()
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
