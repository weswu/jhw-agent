<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'客户后台设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="detail" :label-width="130" ref="model">
        <FormItem label="公司Logo：" style="margin-bottom:20px">
          <JImage :src="detail.logo" @on-change="picChange" :width="104"/>
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
        <FormItem label="视频教程：" style="margin-top:70px">
          <RadioGroup v-model="detail.isMarketableBol">
            <Radio label="01">开启</Radio>
            <Radio label="00">关闭</Radio>
            <Radio label="02">替换链接</Radio>
          </RadioGroup>
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
import JImage from '@/components/group/j-image'
export default {
  components: {
    JHeader,
    JImage
  },
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    picChange (e) {
      this.detail.log = e.src
    },
    submit () {
      this.$http.request({
        url: '/rest/api/agent/member/add',
        data: qs.stringify(this.detail),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('添加成功')
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
