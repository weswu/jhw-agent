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
        <FormItem label="座机：">
          <Input v-model="user.phone" placeholder="请输入座机"></Input>
        </FormItem>
      </Form>
      <Form :model="config" :label-width="130">
        <FormItem label="后台视频教程(腾讯)：" style="margin:70px 0 30px 0">
          <div class="vTitle">视频教程 - 后台操作：</div>
          <Input v-model="config.video.vManage" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vManage')">默认</Button>
          <div class="vTitle">视频教程 - 安全设置：</div>
          <Input v-model="config.video.vAccount" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vAccount')">默认</Button>
          <div class="vTitle">视频教程 - 产品列表：</div>
          <Input v-model="config.video.vProduct" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vProduct')">默认</Button>
          <div class="vTitle">视频教程 - 产品分类：</div>
          <Input v-model="config.video.vProductCategory" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vProductCategory')">默认</Button>
          <div class="vTitle">视频教程 - 产品导入：</div>
          <Input v-model="config.video.vImport" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vImport')">默认</Button>
          <div class="vTitle">视频教程 - 产品下载：</div>
          <Input v-model="config.video.vDownload" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vDownload')">默认</Button>
          <div class="vTitle">视频教程 - 新闻列表：</div>
          <Input v-model="config.video.vNews" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vNews')">默认</Button>
          <div class="vTitle">视频教程 - 新闻分类：</div>
          <Input v-model="config.video.vNewsCategory" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vNewsCategory')">默认</Button>
          <div class="vTitle">视频教程 - 站点数据管理：</div>
          <Input v-model="config.video.vWebsite" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vWebsite')">默认</Button>
          <div class="vTitle">视频教程 - SEO管理：</div>
          <Input v-model="config.video.vSeo" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vSeo')">默认</Button>
          <div class="vTitle">视频教程 - Sitemap生成：</div>
          <Input v-model="config.video.vSitemap" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vSitemap')">默认</Button>
          <div class="vTitle">视频教程 - 批量提交：</div>
          <Input v-model="config.video.vSeoBatch" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vSeoBatch')">默认</Button>
          <div class="vTitle">视频教程 - 第三方统计：</div>
          <Input v-model="config.video.vAnalysis" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vAnalysis')">默认</Button>
        </FormItem>
        <FormItem label="文档：" style="margin:30px 0 30px 0">
          <div class="vTitle">文档 - 建站资讯：</div>
          <Input v-model="config.video.dNews" placeholder="请输入资讯链接"></Input>
          <div class="vTitle">文档 - 更新日志：</div>
          <Input v-model="config.video.dLog" placeholder="请输入日志链接"></Input>
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
      video: {
        vManage: 'http://v.qq.com/vplus/4aa13bffe0e2662991069f1800862a96/foldervideos/gr2002901enccnk',
        vAccount: 'https://v.qq.com/x/page/c0753vzonsm.html',
        vProduct: 'https://v.qq.com/x/page/w0753bnm9kh.html',
        vProductCategory: 'https://v.qq.com/x/page/e0753kcg4xb.html',
        vImport: 'https://v.qq.com/x/page/j0753rag7kr.html',
        vDownload: 'https://v.qq.com/x/page/n0753o7p54m.html',
        vNews: 'https://v.qq.com/x/page/q0753wldx5d.html',
        vNewsCategory: 'https://v.qq.com/x/page/g075303kosj.html',
        vWebsite: 'https://v.qq.com/x/page/f0753d6r4fb.html',
        vSeo: 'https://v.qq.com/x/page/u0753y5akkv.html',
        vSitemap: 'https://v.qq.com/x/page/l0753l1jw2c.html',
        vSeoBatch: 'https://v.qq.com/x/page/u0753ji3n5n.html',
        vAnalysis: 'https://v.qq.com/x/page/j0753ycgfeh.html'
      }
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    picChange (e) {
      this.config.manageLogo1 = e.src
    },
    defalutVideo (e) {
      this.$set(this.config.video, e, this.video[e])
    },
    submit () {
      this.config.manageVideoLink = JSON.stringify(this.config.video)
      this.$store.dispatch('setConfig', this.config)
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
.submit{
  width:70px;
}
</style>
