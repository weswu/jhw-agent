<template>
  <Row id="J_Header" type="flex" justify="space-between">
    <Col>
      <div class="logo">
        <a href="http://www.jihui88.com"><img src="http://img.jihui88.com/upload/w/w5/www2/picture/2017/07/05/54b68a5c-fdd2-4842-9e1e-b88d1c403f28.png" height="30" alt=""></a>
      </div>
      <span style="padding-left:14px">代理后台</span>
    </Col>
    <Col class="userInfo">
      <Dropdown placement="bottom-end" class="j_dropdown_username">
        <a href="javascript:void(0)" style="color: #999" class="header_link">
          {{user.username}}
          <Icon type="md-arrow-dropdown" />
        </a>
        <a href="javascript:void(0)" class="avatar header_link">
          <i class="iconfont icon-huiyuan" v-if="!user.headimg"></i>
          <img :src="'http://img.jihui88.com/'+user.headimg" v-if="user.headimg">
        </a>
        <DropdownMenu slot="list">
          <div class="info">
            <i class="iconfont icon-huiyuan" v-if="!user.headimg"></i>
            <img :src="'http://img.jihui88.com/'+user.headimg" v-if="user.headimg">
            <p>账号：{{user.username}}</p>
          </div>
          <div style="height:80px;"></div>
          <a href="javascript:;" @click="signout" class="signout"><span v-if="user.username !== '未登录'">退出</span><span v-else>登录</span> </a>
        </DropdownMenu>
      </Dropdown>
    </Col>
    <JLogin ref="login"/>
    <!-- 加载中..."  -->
    <JLoading/>
  </Row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import JLogin from '@/components/group/j-login'
import JLoading from '@/components/group/j-loading'
export default {
  components: {
    JLogin,
    JLoading
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.$store.commit('setMenuList', '')
    // this.getUser()
    this.$http.request({
      url: '/rest/api/agent/agentDetail',
      method: 'get'
    }).then((res) => {
      if (res.success) {
        let data = res.attributes.data
        this.$store.commit('setUser', data)
      } else {
        if (res.msgType === 'notLogin' && location.port !== '8080') {
          this.$refs.login.open()
        }
      }
    })
  },
  methods: {
    ...mapActions(['getUser']),
    signout () {
      if (this.user.username === '未登录') {
        this.$refs.login.open()
      } else {
        this.$http.request({
          url: '/rest/api/user/logout',
          method: 'get'
        }).then((res) => {
          if (res.success) {
            this.$store.commit('setUser', {
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
            })
          } else {
            this.$Message.success(res.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
@import '../../assets/variables.less';
#J_Header{
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #383d41;
  .logo{
    float:left;
    width: 120px;    height: 50px;
    border-right: 1px solid #000;
    img{
      height: 36px;
      margin: 4px 0 0 25px;
    }
  }
}

.userInfo{
  text-align: right;
  .header_link{
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    display: inline-block;
    color: #fff
  }
  .ivu-dropdown{
    height: 50px;
    vertical-align: top;
    .ivu-dropdown-rel{
      height: 50px;
    }
    .ivu-select-dropdown{
      margin: 0;
      padding: 0;
      border-radius: 0;
      color: #5d5d5d;
      z-index: 1000;
    }
  }
}
.j_dropdown_username{
  margin-left: 15px;
  background: #2a2a2a;
  .ivu-icon-md-arrow-dropdown{
    transition: all .3s;
  }
  &:hover{
    .ivu-icon-md-arrow-dropdown{
      transform: rotate(-180deg);
    }
  }
  .ivu-select-dropdown{
    position: fixed !important;
    left: auto !important;
    right: 0;
    text-align: center;
    .ivu-dropdown-menu{
      width: 270px;
    }
    .info{
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 10px;
      padding: 30px 0 20px 0;
      line-height: 2.5;
      img{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        vertical-align: middle;
      }
      p{
        font-size: 14px;
        font-weight: bold;
      }
    }
    .ivu-row{
      line-height: 36px;
      i{
        display: block;
        font-size: 32px;
        color: #6d8290;
      }
      a{
        color: #333;
        display: block;
        margin: 5px;
        padding: 10px 0 0 0;
        &:hover{
          background: @background-gray-color;
        }
      }
    }
    .signout{
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;
      background: @background-gray-color;
      color: #4f4e4f;
      font-size: 14px;
    }
  }
  .avatar{
    background: #000;
    padding: 0 7px 0 8px;
    text-align: center;
    img{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .icon-huiyuan{
    width: 32px;
    background: #ff6700;
    color: #fff;
    padding: 8px;
    border-radius: 100%;
  }
}
</style>
