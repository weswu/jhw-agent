<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'创建新的客户'"/>
    <Content>
      <Form :model="detail" :label-width="130" ref="model">
        <FormItem label="用户名：">
          <Input v-model="detail.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码：">
          <Input v-model="detail.password" type="password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="公司名称：">
          <Input v-model="detail.enterpriseName" placeholder="请输入公司名称"></Input>
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
      detail: {}
    }
  },
  methods: {
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
