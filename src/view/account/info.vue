<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'基本信息'" :tip="'请完善以下信息，方便我们更好的为您服务'"/>
    <Content>
      <Form :model="detail" :label-width="130" ref="model">
        <FormItem label="代理商账号：">
          {{detail.username}}
        </FormItem>
        <FormItem label="公司名称：">
          <Input v-model="detail.enterpriseName" placeholder="请输入公司名称"></Input>
        </FormItem>
        <FormItem label="联系人：">
          <Input v-model="detail.name" placeholder="请输入联系人"></Input>
        </FormItem>
        <FormItem label="联系手机：">
          <Input v-model="detail.cellphone" placeholder="请输入联系手机"></Input>
        </FormItem>
        <FormItem label="联系微信：">
          <Input v-model="detail.weixin" placeholder="请输入联系微信"></Input>
        </FormItem>
        <FormItem label="联系QQ：">
          <Input v-model="detail.qq" placeholder="请输入联系QQ"></Input>
        </FormItem>
        <FormItem label="联系邮箱：">
          <Input v-model="detail.email" placeholder="请输入联系邮箱"></Input>
        </FormItem>
        <FormItem label="联系地址：">
          <Input v-model="detail.address" placeholder="请输入联系地址"></Input>
        </FormItem>
        <FormItem label="座机：">
          <Input v-model="detail.phone" placeholder="请输入座机"></Input>
        </FormItem>
        <FormItem label="代理网址：">
          <span>{{detail.bindUrl}}</span>
        </FormItem>
        <FormItem label="加盟时间：" prop="cellphone">
          {{detail.addTime | time}}
        </FormItem>
        <FormItem label="上次登录时间：">
          {{detail.lastLoginTime | time}}
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
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  computed: {
    detail () {
      return this.$store.state.user
    }
  },
  methods: {
    submit () {
      this.$http.request({
        url: '/rest/api/agent/agentEdit',
        data: qs.stringify(this.detail),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
          this.$store.commit('setUser', this.detail)
        } else {
          this.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
