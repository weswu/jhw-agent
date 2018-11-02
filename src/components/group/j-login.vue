<template>
  <div id="A_Login" class="iframe_bg" :style="'display:' + display">
    <div class="iframe_login" ref="login">
      <div class="wrapper">
        <div class="form">
          <img src="http://www.jihui88.com/member/static/images/f-logo.png" alt="" class="logoImg">
          <div class="f-login">
            <div class="f-input">
              <input name="username" type="text" placeholder="请输入经销商账号" v-model="model.username" class="border">
              <input name="password" type="password" placeholder="请输入密码" v-model="model.password" class="border">
              <input type="text" name="randCode" placeholder="填写验证码" v-model="model.randCode">
              <img :src="'http://www.jihui88.com/alphveriImg'+verifyPic" class="veriImg" @click="refreshCode">
            </div>
            <button type="button" class="submit" @click="submit" @keyup.enter="submit">登录</button>
          </div>
        </div>
        <img src="http://www.jihui88.com/member/static/images/f-x.png" alt="close" @click="close" class="close">
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      display: 'none',
      model: {
        username: '',
        password: '',
        randCode: ''
      },
      verifyPic: '',
      placeholder: '请输入账号'
    }
  },
  methods: {
    open (val) {
      this.display = 'block'
    },
    close () {
      this.display = 'none'
    },
    refreshCode () {
      this.verifyPic = '?time=' + new Date().getTime()
    },
    submit (e) {
      if (!this.model.username) {
        return this.$Message.info('账号不能为空')
      }
      if (!this.model.password) {
        return this.$Message.info('密码不能为空')
      }
      this.$store.commit('setLoading', true)
      this.$http.request({
        url: '/rest/api/user/agentLogin',
        data: qs.stringify(this.model),
        method: 'post'
      }).then((res) => {
        this.$store.commit('setLoading', false)
        if (res.success) {
          this.$store.dispatch('getUser')
          this.close()
        } else {
          this.$Message.success(res.msg)
          this.refreshCode()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  height: 501px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  font-family: \\5FAE\8F6F\96C5\9ED1;
  position: relative;
  border: 1px solid #c1c1c1;
  box-shadow: 0 0 6px 3px #3d3d3d;
  border-radius: 3px;
  .logoImg {
    margin: 82px auto 28px;
  }
  .f-login {
    width: 260px;
    margin: 0 auto;
    line-height:37px;
  }
  .f-input {
    width: 260px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin: 0 auto;
    position: relative;
  }
  input {
    border-radius: 5px;
    border: none;
    width: 100%;
    height: 37px;
    padding: 10px 15px;
    outline: 0 none;
    line-height: normal;
  }
  .border {
    border-bottom: 1px solid #d9d9d9;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .veriImg {
    position: absolute;
    right: 14px;
    margin-top: 6px;
    width: 65px;
  }
  .submit {
    background: #ff6700;
    border-radius: 5px;
    border: 0 none;
    cursor: pointer;
    display: block;
    width: 260px;
    margin: 0 auto;
    text-align: center;
    height: 38px;
    color: #fff;
    font-size: 14px;
    transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -webkit-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    margin-top: 20px
  }
}

// iframe
  .iframe_bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    overflow: hidden;
    z-index: 1000;
    transition: all .3s;
    -o-transition: all .3s;
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
  }
.iframe_login{
  width: 348px;
  height: 500px;
  z-index: 999;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  -o-transform: translate(-50%,-50%);
  -moz-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  iframe {
    width: 100%;
    height: 500px;
    border: 1px solid #c1c1c1;
    box-shadow: 0 0 6px 3px #3d3d3d;
    border-radius: 3px;
    background: #fff;
  }
  .wrapper{
    position: relative;
  }
  .close{
    position: absolute;
    right: 11px;
    top: 10px;
    cursor: pointer;
    z-index: 99;
  }
}
</style>
