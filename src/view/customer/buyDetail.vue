<template>
  <Modal
    v-model="modal"
    title="订单详情"
    @on-cancel="cancel">
    <div slot="footer">
      <Button type="text" size="large" @click="cancel">取消</Button>
      <Button type="primary" size="large" @click="submit">修改</Button>
    </div>
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
      <FormItem label="续费年限：">
        {{detail.year}}
      </FormItem>
      <FormItem label="审核状态：">
        <span>{{detail.orderStatus | orderStatus}}</span>
      </FormItem>
      <FormItem label="产品名称：">
        <Input v-model="detail.productName" placeholder="请输入产品名称"></Input>
      </FormItem>
      <FormItem label="金额：">
        <InputNumber v-model="detail.amount" placeholder="请输入金额"></InputNumber>
      </FormItem>
      <FormItem label="购买时间：">
        {{detail.addTime | time}}
      </FormItem>
      <FormItem label="到期时间：">
        {{detail.endTime | time}}
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      modal: false,
      detail: {
        user: {
          enterprise: {}
        }
      }
    }
  },
  methods: {
    open (id, type) {
      this.modal = true
      this.$http.request({
        url: '/rest/api/agent/order/detail?orderId=' + id,
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
        }
      })
    },
    cancel () {
      this.modal = false
    },
    submit () {
      this.$http.request({
        url: '/rest/api/agent/order/edit',
        data: qs.stringify(this.detail),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('修改成功')
          this.$emit('on-change')
          this.cancel()
        }
      })
    }
  },
  filters: {
    orderStatus (val) {
      let text = '未审核'
      if (val === '01') text = '审核通过'
      if (val === '02') text = '审核未通过'
      return text
    }
  }
}
</script>

<style lang="less">
</style>
