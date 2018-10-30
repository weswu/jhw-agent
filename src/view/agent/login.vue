<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'客户登录设置'" :tip="'温馨提醒：联系我们：139 6793 8189 帮您绑定登录网址'"/>
    <Content>
      <Form :model="detail" :label-width="130" ref="model">
        <FormItem label="客户登录网址：">
          <Input v-model="detail.username" placeholder="请输入客户登录网址" style="width:333px;margin-right:7px"></Input>
          <Button class="submit" @click="add" style="padding:6px 20px">提交</Button>
        </FormItem>
        <FormItem label="公司Logo：">
          <JImage :src="detail.logo" @on-change="picChange" :width="104"/>
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
    add () {},
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
