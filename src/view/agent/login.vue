<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'登录页面设置'" :tip="'温馨提醒：联系我们：139 6793 8189 帮您绑定登录网址'"/>
    <Content>
      <Form :model="config" :label-width="150" ref="model">
        <FormItem label="客户登录网址：">
          <span style="color:#aaa">http://admin.{{user.bindUrl}}/manage_v4/login.html</span>
          <a :href="'http://admin.'+user.bindUrl+'/manage_v4/login.html'" target="_blank" style="margin-left:15px;"><Button class="submit" style="width:70px;">打开</Button></a>
        </FormItem>
        <FormItem label="登录页左上Logo：" style="margin-top:20px">
          <JImage :src="config.loginLogo1" @on-change="picChange" :width="104"/>
        </FormItem>
        <FormItem label="登录页广告图：" style="margin-top:25px">
          <JImage :src="config.loginLogo2" @on-change="picChange1" :width="104"/>
        </FormItem>
        <FormItem label="登录页右边Logo：" style="margin-top:25px">
          <JImage :src="config.loginLogo3" @on-change="picChange2" :width="104"/>
        </FormItem>
        <FormItem label="浏览器标签ico缩略图标：" style="margin-top:25px">
          <JImage :src="config.ico" @on-change="picChange3" :width="104"/>
        </FormItem>
      </Form>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit">保存</Button>
    </Footer>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
export default {
  components: {
    JHeader,
    JImage
  },
  computed: {
    ...mapState(['user', 'config'])
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    picChange (e) {
      this.config.loginLogo1 = e.src
    },
    picChange1 (e) {
      this.config.loginLogo2 = e.src
    },
    picChange2 (e) {
      this.config.loginLogo3 = e.src
    },
    picChange3 (e) {
      this.config.ico = e.src
    },
    submit () {
      this.$store.dispatch('setConfig', qs.stringify(this.config))
      let ctx = this
      setTimeout(function () {
        ctx.$Message.success('保存成功')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
</style>
