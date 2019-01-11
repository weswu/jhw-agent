<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'界面编辑设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130" ref="model">
        <FormItem label="界面编辑的网址：" style="color:#aaa">
          http://pc.{{user.bindUrl}}/pc/design.html?layoutId=网站编号
        </FormItem>
        <FormItem label="客户网站预览网址：" style="color:#aaa">
          http://pc.{{user.bindUrl}}/rest/site/网站编号/index
        </FormItem>
        <FormItem label="头部Logo：" style="margin-bottom:20px;padding-top:30px">
          <JImage :src="config.designLogo1" @on-change="picChange" :width="104"/>
        </FormItem>
        <FormItem label="" class="lan">
          <span>中文语言</span><span>英文语言</span>
        </FormItem>
        <FormItem label="设计支持：" class="support">
          <Input v-model="config.designSupportCn"></Input>
          <Input v-model="config.designSupportEn"></Input>
        </FormItem>
        <FormItem label="链接设置：">
          <Input v-model="config.designSupportLink"></Input>
        </FormItem>
        <FormItem label="技术支持：" class="support" style="margin-top:23px;">
          <Input v-model="config.tecSupportCn"></Input>
          <Input v-model="config.tecSupportEn"></Input>
        </FormItem>
        <FormItem label="链接设置：">
          <Input v-model="config.tecSupportLink"></Input>
        </FormItem>
        <FormItem label="界面编辑教程：" style="margin-top:36px">
          <Input v-model="config.video.vPc" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo">默认</Button>
        </FormItem>
      </Form>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit">保存</Button>
    </Footer>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
export default {
  components: {
    JHeader,
    JImage
  },
  computed: {
    ...mapState(['user', 'config'])
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    picChange (e) {
      this.config.designLogo1 = e.src
    },
    defalutVideo () {
      this.$set(this.config.video, 'vPc', 'https://v.qq.com/x/page/a0826kslr5q.html')
    },
    submit () {
      this.config.manageVideoLink = JSON.stringify(this.config.video)
      this.$store.dispatch('setConfig', this.config)
      let ctx = this
      setTimeout(function () {
        ctx.$Message.success('保存成功')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.ivu-form .ivu-input-wrapper {
  width: 412px;
}
.lan{
  margin-top:45px;
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
.submit{
  width:70px;
}
</style>
