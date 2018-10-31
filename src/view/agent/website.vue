<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'客户网站设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="detail" :label-width="130" ref="model">
        <FormItem label="预览网址：">
          <Input v-model="detail.username" placeholder="请输入预览网址" style="width:333px;margin-right:7px"></Input>
          <Button class="submit" @click="add" style="padding:6px 20px">提交</Button>
        </FormItem>
        <FormItem label="公司Logo：" style="margin:44px 0 50px 0">
          <JImage :src="detail.logo" @on-change="picChange" :width="104"/>
        </FormItem>
        <FormItem label="" class="lan">
          <span>中文语言</span><span>英文语言</span>
        </FormItem>
        <FormItem label="设计支持：" class="support">
          <Input v-model="detail.name"></Input>
          <Input v-model="detail.name"></Input>
        </FormItem>
        <FormItem label="链接设置：">
          <Input v-model="detail.name"></Input>
        </FormItem>
        <FormItem label="设计支持：" class="support" style="margin-top:23px;">
          <Input v-model="detail.name"></Input>
          <Input v-model="detail.name"></Input>
        </FormItem>
        <FormItem label="链接设置：">
          <Input v-model="detail.name"></Input>
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

<style lang="less" scoped>
.ivu-form .ivu-input-wrapper {
  width: 412px;
}
.lan{
  span{
    width: 217px;
    display: inline-block;
  }
}
.support{
  margin-top:13px;
  .ivu-input-wrapper{
    width: 195px;
    margin-right: 22px;
  }
}
</style>
