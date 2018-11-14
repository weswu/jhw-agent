<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'管理后台设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130">
        <FormItem label="客户后台网址：" style="color:#aaa">
          http://admin.{{user.bindUrl}}/manage_v4/index.html#/
        </FormItem>
        <FormItem label="公司Logo：" style="margin-bottom:20px">
          <JImage :src="config.manageLogo1" @on-change="picChange" :width="104"/>
        </FormItem>
      </Form>
      <Form :model="user" :label-width="130">
        <FormItem label="联系人：">
          <Input v-model="user.name" placeholder="请输入联系人"></Input>
        </FormItem>
        <FormItem label="联系手机：">
          <Input v-model="user.cellphone" placeholder="请输入联系手机"></Input>
        </FormItem>
        <FormItem label="联系微信：">
          <Input v-model="user.weixin" placeholder="请输入联系微信"></Input>
        </FormItem>
        <FormItem label="联系QQ：">
          <Input v-model="user.qq" placeholder="请输入联系QQ"></Input>
        </FormItem>
        <FormItem label="联系邮箱：">
          <Input v-model="user.email" placeholder="请输入联系邮箱"></Input>
        </FormItem>
        <FormItem label="联系地址：">
          <Input v-model="user.address" placeholder="请输入联系地址"></Input>
        </FormItem>
      </Form>
      <Form :model="config" :label-width="130">
        <FormItem label="后台视频教程：" style="margin:70px 0 30px 0">
          <div class="vTitle">视频教程 - 教程中心：</div>
          <Input v-model="config.video.vManage" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 安全设置：</div>
          <Input v-model="config.video.vAccount" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 产品列表：</div>
          <Input v-model="config.video.vPorduct" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 产品分类：</div>
          <Input v-model="config.video.vPorductCategory" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 产品导入：</div>
          <Input v-model="config.video.vImport" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 产品下载：</div>
          <Input v-model="config.video.vDownload" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 新闻列表：</div>
          <Input v-model="config.video.vNews" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 新闻分类：</div>
          <Input v-model="config.video.vNewsCategory" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 站点数据管理：</div>
          <Input v-model="config.video.vWebsite" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - SEO管理：</div>
          <Input v-model="config.video.vSeo" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - Sitemap生成：</div>
          <Input v-model="config.video.vSitemap" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 批量提交：</div>
          <Input v-model="config.video.vSeoBatch" placeholder="请输入视频链接"></Input>
          <div class="vTitle">视频教程 - 第三方统计：</div>
          <Input v-model="config.video.vAnalysis" placeholder="请输入视频链接"></Input>
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
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    picChange (e) {
      this.config.manageLogo1 = e.src
    },
    submit () {
      this.config.manageVideoLink = JSON.stringify(this.config.video)
      this.$store.dispatch('setConfig', qs.stringify(this.config))
      this.$store.dispatch('setUser', qs.stringify(this.user))
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
</style>
