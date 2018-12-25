<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'小程序后台设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130">
        <FormItem label="认识机汇网：" style="margin-bottom:20px">
          <JImage :src="config.manageLogo11" @on-change="picChange" :width="104" style="border-radius: 104px;width: 104px;overflow: hidden;height: 104px;"/>
        </FormItem>
      </Form>
      <Form :model="config" :label-width="130">
        <FormItem label="后台视频链接：" style="margin:70px 0 30px 0">
          <div class="vTitle">10分钟入门</div>
          <Input v-model="config.video.vTen" placeholder="请输入腾讯视频链接"></Input>
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
    ...mapState(['user', 'config'])
  },
  data () {
    return {
      video: {}
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    picChange (e) {
      this.config.manageLogo11 = e.src
    },
    submit () {
      this.config.manageVideoLink = JSON.stringify(this.config.video)
      this.$store.dispatch('setConfig', qs.stringify(this.config))
      let ctx = this
      setTimeout(function () {
        ctx.$Message.success('保存成功')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.vTitle{
  padding-left: 12px
}
.submit{
  width:70px;
}
</style>
