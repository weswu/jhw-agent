# jhw_agent
> [经销商后台](http://www.jihui88.com/agent_v4/index.html)


### UI风格
和https://github.com/weswu/jhw-member统一


## 软件架构
- vue cli3.0
- iView3.x
- [阿里图标-经销商后台](http://iconfont.cn/)

## Install

下载

```shell
npm install
```

## Run

启动服务器

```shell
npm run dev
```

打包

```shell
npm run build
```

测试账号
```shell
jhw_wxw / 123456
```

## 文件结构
```shell
.
├── public  index页面
└── src
    ├── api  AJAX请求
    ├── assets  项目静态资源
    └── components  业务组件
        ├── group 组件
        └── main 通用模块
    ├── config  开发相关配置
    └── libs  封装工具函数
        ├── api.request/axios  接口请求
        ├── filter  自定义全局过滤
        ├── fun  自定义全局函数
        └── tools/utils  其它函数
    ├── router  路由配置
    ├── store  Vuex配置
    └── view  页面文件
        ├── account  账号管理（基础信息、修改登录密码）
        ├── agent  代理设置（登录页面设置、注册功能设置、管理后台设置、界面编辑设置、小程序后台设置）
        └── customer 客户信息（客户列表、创建新的客户、站点列表、产品订单列表、续费列表）
  └── vue.config.js  项目构建配置
```


## 技术支持
- [机汇网后台平面地址](https://pro.modao.cc/app/b3Vtu4k8TMQFBimdto15jpLCT6LK84o#screen=s42466fe76d153992602900)
- [机汇网内部文档（经销商后台接口）](https://jihui88.oschina.io/jhw-api/?file=home-%E9%A6%96%E9%A1%B5)
