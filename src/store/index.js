import {
  getMenuByRouter
} from '@/libs/util'
import Vue from 'vue'
import Vuex from 'vuex'
import routers from '@/router/routers'
import qs from 'qs'
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
    menuList: [],
    config: {
      user: {
        name: ''
      },
      video: {}
    },
    loading: false
  },
  getters: {
    user: state => state.user,
    menuList: state => state.menuList,
    config: state => state.config,
    loading: state => state.loading
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setMenuList (state, menuList) {
      state.menuList = getMenuByRouter(routers, '')
    },
    setConfig (state, config) {
      state.config = config
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    getUser ({ commit, state }) {
      this._vm.$http.request({
        url: '/rest/api/agent/agentDetail',
        method: 'get'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          this.commit('setUser', data)
        }
      })
    },
    setUser ({ commit, state }, params) {
      this._vm.$http.request({
        url: '/rest/api/agent/agentEdit',
        data: params,
        method: 'post'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          this.commit('setUser', data)
        }
      })
    },
    getConfig ({ commit, state }) {
      this._vm.$http.request({
        url: '/rest/api/agent/config/getConfig',
        method: 'get'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          // 视频默认状态
          data.video = {
            vTenText: '3分钟入门',
            vTen: 'https://v.qq.com/x/page/a0826kslr5q.html'
          }
          if (data.manageVideoLink) {
            data.video = JSON.parse(data.manageVideoLink)
            // 十分钟
            if (!data.video.vTenText) data.video.vTenText = '3分钟入门'
          }
          if (!data.manageVideoState) data.manageVideoState = '02'
          // 注册默认状态
          if (!data.openRegister) data.openRegister = '00'
          if (!data.openCellphoneRegister) data.openCellphoneRegister = '00'
          if (!data.registerNotifyAgent) data.registerNotifyAgent = '00'
          this.commit('setConfig', data)
        }
      })
    },
    setConfig ({ commit, state }, params) {
      let data = params
      delete data.user
      delete data.video
      this._vm.$http.request({
        url: '/rest/api/agent/config/editConfig',
        data: qs.stringify(data),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.video = {}
          if (data.manageVideoLink) {
            data.video = JSON.parse(data.manageVideoLink)
          }
          this.commit('setConfig', data)
        }
      })
    }
  }
})
