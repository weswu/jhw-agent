import Main from '@/components/main/main'
import parentView from '@/components/main/parent-view'

const routers = [
  {
    path: '/',
    name: 'index',
    redirect: '/account/info',
    component: Main,
    meta: {
      icon: 'ai-home',
      title: '首页',
      showInMenu: false,
      root: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          icon: 'ai-home',
          title: '首页',
          showInMenu: true
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/',
    name: '1',
    meta: {
      icon: 'fl-renyuan',
      title: '账号信息',
      showInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'account',
        name: 'account',
        meta: {
          icon: 'account-only',
          title: '账号管理',
          showInMenu: true,
          manage: 'account/info'
        },
        component: parentView,
        children: [
          {
            path: 'info',
            name: 'account/info',
            meta: {
              title: '基础信息',
              showInMenu: true
            },
            component: () => import('@/view/account/info')
          },
          {
            path: 'password',
            name: 'account/password',
            meta: {
              title: '修改登录密码',
              showInMenu: true
            },
            component: () => import('@/view/account/password')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: '2',
    meta: {
      icon: 'kehuqunzu',
      title: '客户信息',
      showInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'member',
        name: 'member',
        meta: {
          icon: 'guazhangkehuliebiao',
          title: '客户列表',
          showInMenu: true,
          manage: 'member/list'
        },
        component: parentView,
        children: [
          {
            path: 'list',
            name: 'member/list',
            meta: {
              title: '客户列表',
              showInMenu: true
            },
            component: () => import('@/view/customer/list')
          },
          {
            path: 'add',
            name: 'member/add',
            meta: {
              title: '创建新的客户',
              showInMenu: true
            },
            component: () => import('@/view/customer/add')
          },
          {
            path: 'static/:id',
            name: 'member/static',
            meta: {
              title: '站点',
              detail: true,
              menu: [
                { text: '站点列表', value: '0' }
              ]
            },
            components: require('@/view/customer/static')
          },
          {
            path: 'order/:id',
            name: 'member/order',
            meta: {
              title: '站点',
              detail: true,
              menu: [
                { text: '添加产品', value: '0' }
              ]
            },
            components: require('@/view/customer/orderAdd')
          }
        ]
      },
      {
        path: 'order',
        name: 'order',
        meta: {
          icon: 'liebiao',
          title: '产品订单列表',
          showInMenu: true,
          manage: 'order/list'
        },
        component: parentView,
        children: [
          {
            path: 'list',
            name: 'order/list',
            meta: {
              title: '产品订单列表',
              showInMenu: true
            },
            component: () => import('@/view/customer/orderList')
          },
          {
            path: 'buy/:id',
            name: 'order/buy',
            meta: {
              title: '续费列表',
              detail: true,
              menu: [
                { text: '续费列表', value: '0' },
                { text: '添加续费', value: '1' }
              ]
            },
            components: require('@/view/customer/buy')
          },
          {
            path: 'detail/:id',
            name: 'order/detail',
            meta: {
              title: ' ',
              detail: true,
              menu: [
                { text: '订单详情', value: '0' }
              ]
            },
            components: require('@/view/customer/orderDetail')
          }
        ]
      }
    ]
  },
  {
    path: '/',
    name: '3',
    meta: {
      icon: 'liuliangyunpingtaitubiao03',
      title: '代理设置',
      showInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'agent',
        name: 'agent',
        meta: {
          icon: 'songmenhuwangzhan',
          title: '网站',
          showInMenu: true,
          manage: 'agent/login'
        },
        component: parentView,
        children: [
          {
            path: 'login',
            name: 'agent/login',
            meta: {
              title: '登录页面设置',
              showInMenu: true
            },
            component: () => import('@/view/agent/login')
          },
          {
            path: 'backstage',
            name: 'agent/backstage',
            meta: {
              title: '管理后台设置',
              showInMenu: true
            },
            component: () => import('@/view/agent/backstage')
          },
          {
            path: 'website',
            name: 'agent/website',
            meta: {
              title: '界面编辑设置',
              showInMenu: true
            },
            component: () => import('@/view/agent/website')
          },
          {
            path: 'miniprogram',
            name: 'agent/miniprogram',
            meta: {
              title: '小程序后台设置',
              showInMenu: false
            },
            component: () => import('@/view/agent/miniprogram')
          }
        ]
      }
    ]
  }
];
export default routers;
