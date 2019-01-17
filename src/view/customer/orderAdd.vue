<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'添加产品'"></JHeader>
    <Content>
      <Form :model="detail" :label-width="130" ref="modalForm">
        <FormItem label="所属公司：">
          {{detail.enterpriseName}}
        </FormItem>
        <FormItem label="被复制对象：">
          <Input v-model="detail.copyId" class="w244" placeholder="请输入被复制的站点编号"></Input>
          <div class="j_tip j_tip_input">
            温馨提醒：您要参考哪个模板，就填写模板的编号，不填写的话，稍后进入界面编辑，也可以挑选系统模板。
          </div>
        </FormItem>
        <FormItem label="商品类型：">
          <RadioGroup v-model="detail.productType">
            <Radio label="pc">网站</Radio>
            <!--<Radio label="wcd">微传单</Radio>或小程序编号
            <Radio label="wxapp">微信小程序</Radio>
            <Radio label="wpc">微网页</Radio>-->
          </RadioGroup>
        </FormItem>
        <FormItem label="开通年限：">
          <Select v-model="detail.year" class="w180" placeholder="请选择开通年限">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select><span class="j_unit">年</span>
        </FormItem>
      </Form>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit">确定</Button>
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
        productType: 'pc',
        year: '1'
      }
    }
  },
  created () {
    this.detail.userId = this.decodeId(this.$route.params.id, 'User_', 32)
    this.detail.enterpriseName = this.$route.query.name
  },
  methods: {
    submit () {
      this.$http.request({
        url: '/rest/api/agent/order/add',
        data: qs.stringify(this.detail),
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
.j_form_detail .j_tip_input{
  position: absolute;
  left: 270px;
  top: -21px;
  line-height: 2;
  color: #999;
}
</style>
