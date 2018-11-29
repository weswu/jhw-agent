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
      <FormItem label="订单编号：">
        {{detail.orderSn}}
      </FormItem>
      <FormItem label="产品名称：">
        <Input v-model="detail.productName" placeholder="请输入产品名称"></Input>
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
  </Modal>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      modal: false,
      detail: {}
    }
  },
  methods: {
    open (id, type) {
      this.modal = true
      this.$http.get('/rest/api/agent/order/detail?orderId=' + id).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
        } else {
          this.$Message.error(res.msg)
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
  }
}
</script>

<style lang="less">
</style>
