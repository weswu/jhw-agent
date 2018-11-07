<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'客户后台设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130">
        <FormItem label="公司Logo：" style="margin-bottom:20px">
          <JImage :src="config.manageLogo1" @on-change="picChange" :width="104"/>
        </FormItem>
      </Form>
      <Form :model="user" :label-width="130">
        <FormItem label="联系人：">
          <Input v-model="user.name" placeholder="请输入联系人"></Input>
        </FormItem>
        <FormItem label="联系手机：">
          <Input v-model="user.cellphone" placeholder="请输入联系手机"></Input>
        </FormItem>
        <FormItem label="联系微信：">
          <Input v-model="user.weixin" placeholder="请输入联系微信"></Input>
        </FormItem>
        <FormItem label="联系QQ：">
          <Input v-model="user.qq" placeholder="请输入联系QQ"></Input>
        </FormItem>
        <FormItem label="联系邮箱：">
          <Input v-model="user.email" placeholder="请输入联系邮箱"></Input>
        </FormItem>
        <FormItem label="联系地址：">
          <Input v-model="user.address" placeholder="请输入联系地址"></Input>
        </FormItem>
      </Form>
      <Form :model="config" :label-width="130">
        <FormItem label="视频教程：" style="margin-top:70px">
          <RadioGroup v-model="config.manageVideoState">
            <Radio label="01">开启</Radio>
            <Radio label="02">关闭</Radio>
            <Radio label="03">替换链接</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="联系地址：" v-if="config.manageVideoState === '03'">
          <Input v-model="config.manageVideoLink" placeholder="请输入联系地址"></Input>
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
      this.config.manageLogo1 = e.src
    },
    submit () {
      this.$store.dispatch('setConfig', qs.stringify(this.config))
      this.$store.dispatch('setUser', qs.stringify(this.user))
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
