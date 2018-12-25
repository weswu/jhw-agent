<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'订单详情'"></JHeader>
    <Content>
      <Form :model="detail" :label-width="130" ref="modalForm">
        <FormItem label="账号：">
          {{detail.username}}
        </FormItem>
        <FormItem label="公司名称：">
          {{detail.user.enterprise.name || ''}}
        </FormItem>
        <FormItem label="订单编号：">
          {{detail.orderSn}}
        </FormItem>
        <FormItem label="版本：">
          <Input v-model="detail.productName" placeholder="请输入版本"></Input>
        </FormItem>
        <FormItem label="金额：">
          <InputNumber v-model="detail.amount" placeholder="请输入金额"></InputNumber>
        </FormItem>
        <FormItem label="添加时间：">
          {{detail.addTime | time}}
        </FormItem>
        <FormItem label="到期时间：">
          {{detail.endTime | time}}
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
  data () {
    return {
      detail: {
        user: {
          enterprise: {}
        }
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.request({
        url: '/rest/api/agent/order/detail?orderId=' + this.$route.params.id
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          this.detail = data
        }
      })
    },
    submit () {
      let data = {
        orderId: this.detail.orderId,
        amount: this.detail.amount,
        productName: this.detail.productName
      }
      this.$http.request({
        url: '/rest/api/agent/order/edit',
        data: qs.stringify(data),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('保存成功')
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
