<template>
  <Sider id="J_Sider" ref="side" hide-trigger collapsible :width="180" :collapsed-width="50" v-model="collapsed">
    <Header :style="{padding: 0}" class="layout-header-bar" @click.native="collapsedSider">
      <Icon :class="rotateIcon" type="ios-menu" size="20"></Icon><Icon type="md-arrow-dropright" />
    </Header>
    <Menu ref="menu" theme="dark" width="auto" :class="menuitemClasses" :active-name="activeName" :open-names="openNames" @on-select="mrouter" accordion>
      <div v-for="item in menuList" :key="item.name">
        <Tooltip :content="item.meta.title" placement="right" :transfer="transfer" :disabled="disabled" v-if="!item.children || item.meta.root">
          <MenuItem :name="item.name === 'index' ? '' : item.name">
            <i :class="'iconfont icon-' + item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </MenuItem>
        </Tooltip>
        <Submenu :name="item.name" v-if="item.children && item.children.length > 0 && !item.meta.root">
          <template slot="title">
            <Tooltip :content="item.meta.title" placement="right" :transfer="transfer" :disabled="disabled">
              <i :class="'iconfont icon-' + item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </Tooltip>
          </template>
          <Tooltip v-for="(row, i) in item.children" :key="i" :content="row.meta.title" placement="right" :transfer="transfer" :disabled="disabled">
            <MenuItem :name="row.meta.manage || row.name" v-if="!row.meta.href">
              <i :class="'iconfont icon-' + row.meta.icon"></i>
              <span>{{row.meta.title}}</span>
            </MenuItem>
            <a :href="row.meta.href + (item.name === 'fenxiao' ? sid : '')" target="_blank" v-if="row.meta.href">
              <MenuItem :name="row.name">
                <i :class="'iconfont icon-' + row.meta.icon"></i>
                <span>{{row.meta.title}}</span>
              </MenuItem>
            </a>
          </Tooltip>
        </Submenu>
      </div>
    </Menu>
  </Sider>
</template>

<script>
export default {
  data () {
    return {
      collapsed: false,
      transfer: true, // 是否将弹层放置于 body 内，它将不受父级样式影响
      disabled: false, // 是否禁用提示框
      activeName: '',
      openNames: []
    }
  },
  computed: {
    rotateIcon () {
      return [
        'yd_collapsed',
        'menu-icon',
        this.collapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.collapsed ? 'collapsed-menu' : ''
      ]
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  created () {
    // 初始化选中样式
    this.initRoute()
  },
  mounted () {
    var vm = this
    setTimeout(function () {
      vm.disabled = !vm.collapsed
    }, 1000)
  },
  methods: {
    mrouter (name) {
      this.$router.push({ path: '/' + name })
    },
    initRoute () {
      let match = this.$route.matched
      this.activeName = match.length > 1 ? (match[1].meta.manage || match[1].name) : ''
      this.openNames = match.length > 0 ? (match[0].name && match[0].name.split(',')) : []
      this.$nextTick(() => {
        this.$refs.menu && this.$refs.menu.updateOpened()
      })
    },
    collapsedSider () {
      this.$refs.side.toggleCollapse()
      this.disabled = !this.collapsed
      this.collapsed = this.collapsed
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
#J_Sider{
  background: #2d303c;
  height: 100%;
  transition: none;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar{width: 0;}
  .ivu-tooltip,.ivu-tooltip-rel{width: 100%}
  .layout-header-bar{
    background: #414659;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &:hover{
      .menu-icon{
        color: #fff;
      }
    }
    .menu-icon{
      color: #d8d8d8;
    }
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #2d303c;
  }
  // 选中
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
    background: #12bedb !important;
    border-right: none;
    color: #fff;
  }
  // 展开
  .ivu-icon-ios-menu{
    transform: rotate(90deg);
  }
  .rotate-icon{
    transform: rotate(0deg);
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title {
    background: #3a3f51;
  }
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
  }

  .menu-item{
    font-size: 12px;
    line-height: 40px;
    .ivu-menu-item {
      font-size: 12px;
    }
    span{
       margin-right: 0;
       display: inline-block;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       vertical-align: middle;
    }
    .iconfont {
        float: left;
        margin-right: 0;
        vertical-align: middle;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        width: 50px;
        .iconfont{
          font-size: 14px;
        }
    }
    .ivu-menu-submenu-title-icon{
      font-size: 14px;
      position: absolute;
      right: 3px;
      top: 14px;
        &::before{
          content: "\F341";
        }
    }
    // 二级菜单
    .ivu-menu-submenu{
      .ivu-menu-item {
        padding-left: 10px !important;
        transition: none;
      }
    }
    // 二级菜单打开
    .ivu-menu-opened{
      .ivu-menu-submenu-title-icon{
          transform: rotate(90deg);
      }
    }
  }

  // 菜单关闭
  .collapsed-menu {
    span{
      width: 0;
    }
    .iconfont {
      width: 100%;
    }
    .ivu-icon{
      display: none
    }
    // 二级
    .ivu-menu-submenu{
      .ivu-menu-item {
        padding-left: 0 !important;
        span{
          width: 0px;
        }
      }
    }
  }
}
</style>
