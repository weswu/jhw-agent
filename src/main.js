import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import axios from './libs/api.request'
import 'iview/dist/styles/iview.css'
import './assets/base.less'
import './libs/filters'
import './libs/fun'
Vue.use(iView)
// ajax
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
