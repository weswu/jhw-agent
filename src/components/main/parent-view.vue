<template>
  <Layout class="ivu-layout-has-sider">
    <Sider id="J_Side_Menu" ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" width="180" v-if="win !== 'small' || detail">
      <div class="title">
        <span v-if="win === 'small' || !detail">{{title || 'Basic Table'}}</span>
        <span v-else @click="back" class="back"><i class="iconfont icon-fanhui"></i>返回</span>
      </div>
      <div @click="collapsedSider" :class="rotateIcon">
        <div class="navbar-collapse-bg"></div>
        <img src="http://www.jihui88.com/manage_v4/platform/img/toggle.png" alt="">
      </div>
      <Menu ref="menu" width="auto" :class="menuitemClasses" :active-name="activeName" @on-select="mrouter">
        <MenuItem :name="item.value || item.name" v-for="(item, index) in list" :key="index">
          <span class="name">{{item.text || item.meta.title}}</span>
        </MenuItem>
      </Menu>
    </Sider>
    <router-view/>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isCollapsed: false,
      list: [],
      detail: false,
      activeName: '',
      title: ''
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.menuList,
      win: state => state.win
    }),
    rotateIcon () {
      return [
        'rotate',
        this.isCollapsed ? 'rotate-toggle' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  watch: {
    $route (to, from) {
      this.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 三级导航权限
      this.detail = this.$route.meta.detail || false
      if (this.detail) {
        this.list = this.$route.meta.menu
        this.activeName = '0'
      } else {
        this.menuList.forEach(item => {
          item.children && item.children.forEach(row => {
            if (row.name === this.$route.matched[1].name) {
              this.list = row.children
              this.title = row.meta.title
            }
          })
        })
        this.activeName = this.$route.name
      }
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
      })
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    mrouter (name) {
      if (this.detail) {
        this.activeName = name
        this.$children[0].$children[1].active = name
      } else {
        this.$router.push({ path: '/' + name })
      }
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less">
#J_Side_Menu{
  background: #ebedf1;
  .title{
    height: 70px;
    line-height: 70px;
    padding-left: 30px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background: #dadee4;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    .back {
      cursor: pointer;
      i{
        font-size: 12px;
        padding-right: 6px;
        display: inline-block;
        vertical-align: top;
      }
    }
  }
  .rotate{
    position: absolute;
    z-index: 100;
    right: 0;
    top: 300px;
    width: 20px;
    height: 50px;
    cursor: pointer;
    .navbar-collapse-bg{
      right: 0;
      left: auto;
      border-bottom: 9px solid transparent;
      border-left: none;
      border-right: 13px solid #f5f6f5;
      border-top: 9px solid transparent;
      width: 0;
      height: 50px;
      position: absolute;
    }
    img{
      width: 9px;
      z-index: 100;
      position: relative;
      top: 18px;
      right: -8px;
      height: 13px;
    }
    &:hover{
      transition: all 0.2s ease;
      .navbar-collapse-bg{
        border-bottom: 8px solid transparent;
        border-left: none;
        border-right: 20px solid #f7f7f7;
        border-top: 8px solid transparent
      }
      img{
        width: 11px;
        right: -5px;
      }
    }
  }
  .rotate-toggle{
    right: -13px;
    .navbar-collapse-bg{
      border-right: none;
      border-left: 13px solid #ebedf1;
      left: 6px;
    }
    img{
      transform: rotate(180deg);
    }
    &:hover{
      .navbar-collapse-bg{
        border-bottom: 8px solid transparent;
        border-right: none;
        border-left: 20px solid #ebedf1;
        border-top: 8px solid transparent
      }
      img{
        right: -10px
      }
    }
  }
  .menu-item {
    .name{
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: bottom;
      padding-left: 6px;
    }
    .ivu-badge{
      float: right;
      .demo-badge-alone{
        background:#ff6700;
        box-shadow:none;
      }
    }
  }

  .ivu-menu-light{
    background: #ebedf1;
    z-index: 99;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item{
    border-right: none;
    padding-right: 15px;
    &:hover{
      background: #f3f3f3;
      color: #585858;
    }
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: inherit;
    border-right: none;
    z-index: 2;
    background: #fff;overflow: hidden;
    &:after{
      display: none;
    }
  }
}
</style>
