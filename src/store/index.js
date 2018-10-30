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
      'username': '未登录',
      'weixin': null,
      'address': '',
      'email': null,
      'cellphone': null,
      'enterpriseName': '经销商分公司',
      'name': null,
      'lastLoginTime': 1540445759691,
      'qq': null,
      'addTime': 1540430568989
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
    getUser ({ commit, state }) {
      return this._vm.$http.request({
        url: '/rest/api/agent/agentDetail',
        method: 'get'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          this.commit('setUser', data)
        } else {
          this._vm.$Message.success(res.msg)
        }
      })
    }
  }
})
