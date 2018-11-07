<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'客户网站设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130" ref="model">
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
      </Form>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit">保存</Button>
    </Footer>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JImage from '@/components/group/j-image'
export default {
  components: {
    JHeader,
    JImage
  },
  computed: {
    ...mapState(['config'])
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    submit () {
      this.$store.dispatch('setConfig', qs.stringify(this.config))
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
