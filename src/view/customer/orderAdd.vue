<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'创建新的客户订单'"></JHeader>
    <Content>
      <Form :model="detail" :label-width="130" ref="modalForm">
        <FormItem label="商品类型：">
          <RadioGroup v-model="detail.productType">
            <Radio label="pc">网站</Radio>
            <Radio label="wcd">微传单</Radio>
            <Radio label="wxapp">微信小程序</Radio>
            <Radio label="wpc">微网页</Radio>
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
export default {
  components: {
    JHeader
  },
  data () {
    return {
      detail: {
        productType: 'pc'
      }
    }
  },
  created () {
    this.detail.userId = this.decodeId(this.$route.params.id, 'User_', 32)
  },
  methods: {
    submit () {
      let data = {
        userId: this.detail.userId,
        productType: this.detail.productType
      }
      this.$http.request({
        url: '/rest/api/agent/order/add',
        data: qs.stringify(data),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.detail = res.attributes.data
          this.$Message.success('创建成功')
        } else {
          this.$Message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
