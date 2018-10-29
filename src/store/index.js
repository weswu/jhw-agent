import {
  getMenuByRouter
} from '@/libs/util'
import Vue from 'vue'
import Vuex from 'vuex'
import routers from '@/router/routers'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      name: '未登录',
      username: '未登录',
      headimg: '',
      addTime: 1272102123858,
      enterprise: {}
    },
    menuList: []
  },
  getters: {
    user: state => state.user,
    menuList: state => state.menuList
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setMenuList (state, menuList) {
      state.menuList = getMenuByRouter(routers, '')
    }
  },
  actions: {
  }
})
