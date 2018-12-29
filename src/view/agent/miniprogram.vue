<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'小程序后台设置'" :tip="tip"/>
    <Content>
      <Form :model="config" :label-width="160">
        <FormItem :label="'认识' + user.enterpriseName + '：'" style="margin-bottom:20px">
          <JImage :src="config.wxappLogo" @on-change="picChange" :width="104" style="border-radius: 104px;width: 104px;overflow: hidden;height: 104px;"/>
        </FormItem>
        <FormItem label="关于我们：">
          <span @click="edit('company')" class="a_underline">编辑</span>
        </FormItem>
        <FormItem label="新闻列表：">
          <span @click="edit('news')" class="a_underline">编辑</span>
        </FormItem>
        <FormItem label="新闻分类：">
          <span @click="edit('news_category')" class="a_underline">编辑</span>
        </FormItem>
        <FormItem label="常见问题：">
          <Select v-model="config.questionCateId" class="w244">
            <Option v-for="item in cateList" :value="item.categoryId" :key="item.categoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="精选：">
          <Select v-model="config.qualityCateId" class="w244">
            <Option v-for="item in cateList" :value="item.categoryId" :key="item.categoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="后台视频链接：" style="margin:50px 0 30px 0">
          <div class="vTitle">10分钟入门</div>
          <Input v-model="config.video.vTen" placeholder="视频地址参考：https://v.qq.com/x/page/xxx.html"></Input>
        </FormItem>
      </Form>
      <Modal
        class-name="iframe-edit"
        v-model="modal"
        title="编辑"
        width="820">
        <iframe :src="'http://www.jihui88.com/manage_v4/index.html?win=small&lanId=1#/' + type" style="width:790px;height:650px;"></iframe>
        <div slot="footer" style="display:none"></div>
      </Modal>
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
      modal: false,
      tip: '',
      type: '',
      cateList: [],
      video: {}
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
    this.tip = '温馨提醒：<br/>1、用 appid <a href="http://api.jihui88.net/jihui_wxapp/app/#/auth" target="_blank">授权</a> 机汇网代为开发小程序。<br/>2、设置小程序 <a href="https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=505145246&lang=zh_CN" target="_blank">服务器域名</a>；<br/>（1）request合法域名：wx.jihui88.net、api.jihui88.net、www.jihui88.com、vv.video.qq.com<br/>（2）uploadFile合法域名：www.jihui88.com<br/>（3）downloadFile合法域名：www.jihui88.com、img.jihui88.com<br/>3、搜索 <a href="http://api.jihui88.net/jihui_wxapp/app/#/" target="_blank">小程序名</a> 查询设置参数；<br/>（1）选择模板：207<br/>（2）模板配置：<pre>{\n&nbsp;&nbsp;"extEnable": true,\n&nbsp;&nbsp;"extAppid": "wx2ad5856ee82bdfc3",\n&nbsp;&nbsp;"ext": {\n&nbsp;&nbsp;&nbsp;&nbsp;"appid": "wx2ad5856ee82bdfc3",\n&nbsp;&nbsp;&nbsp;&nbsp;"domain": "admin.' + this.user.bindUrl + '"\n&nbsp;&nbsp;}\n}</pre>（3）页面小程序码：/pages/user/login<br/>（4）代码管理：上传代码、提交审核、发布'
    this.getCate()
  },
  methods: {
    getCate () {
      this.$http.request({
        url: '/rest/api/category/news?pageSize=1000'
      }).then((res) => {
        if (res.success) {
          this.cateList = res.attributes.data
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    picChange (e) {
      this.config.wxappLogo = e.src
    },
    edit (e) {
      this.type = e
      this.modal = true
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
.iframe-edit{
  .ivu-modal-footer{
    display: none
  }
}
</style>
