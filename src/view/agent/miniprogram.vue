<template>
  <Layout class="j_layout_content j_form_detail j_agent_miniprogram">
    <JHeader :title="'小程序后台设置'"/>
    <Content>
      <div class="j_tip" style="margin-top:0">
        温馨提醒：<br/>
        一、使用<a href="http://api.jihui88.net/jihui_wxapp/app/#/page/wx2aba9d238ba02a76" target="_blank">机汇网小程序</a>，添加页面路径就完成了：/pages/user/login?domain=admin.{{user.bindUrl}}<br/>
        二、使用自己注册的小程序可按下面步骤执行。<br/>
        1、<a href="http://api.jihui88.net/jihui_wxapp/app/#/auth" target="_blank">授权</a>: 使用 appid 机汇网代为开发小程序。<br/>
        2、<a href="https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=505145246&lang=zh_CN" target="_blank">小程序服务器域名</a>: 未设置可手动添加；<br/>
        （1）request合法域名：wx.jihui88.net、api.jihui88.net、www.jihui88.com、vv.video.qq.com<br/>
        （2）uploadFile合法域名：www.jihui88.com<br/>
        （3）downloadFile合法域名：www.jihui88.com、img.jihui88.com<br/>
        3、搜索 <a href="http://api.jihui88.net/jihui_wxapp/app/#/" target="_blank">小程序名</a> 查询设置参数；<br/>
        （1）选择模板：214<br/>
        （2）模板配置：<Poptip placement="right" width="400" trigger="hover"><span class="a_underline">查看</span>
          <div slot="content"><pre>{<br/>&nbsp;&nbsp;"extEnable": true,<br/>&nbsp;&nbsp;"extAppid": "替换成appid",<br/>&nbsp;&nbsp;"ext": {<br/>&nbsp;&nbsp;&nbsp;&nbsp;"appid": "替换成appid",<br/>&nbsp;&nbsp;&nbsp;&nbsp;"domain": admin.{{user.bindUrl}}<br/>&nbsp;&nbsp;}<br/>}</pre></div></Poptip><br/>
        （3）代码管理流程：上传代码、提交审核、发布
      </div>
      <Form :model="config" :label-width="160">
        <FormItem label="小程序Banner：" style="margin-bottom:20px">
          <JBanner/>
        </FormItem>
        <FormItem :label="'认识' + user.enterpriseName + '：'" style="margin-bottom:20px">
          <JImage :src="config.wxappLogo" @on-change="picChange" :width="104" style="border-radius: 104px;width: 104px;overflow: hidden;height: 104px;"/>
        </FormItem>
        <FormItem label="关于我们：" style="margin-bottom:30px">
          <span @click="edit('company')" class="a_underline">编辑</span>
        </FormItem>

        <FormItem label="产品列表：">
          <span @click="edit('product')" class="a_underline">编辑</span>
        </FormItem>
        <FormItem label="产品分类：">
          <span @click="edit('product_category')" class="a_underline">编辑</span>
        </FormItem>
        <FormItem label="小程序案例：">
          <RadioGroup v-model="config.miniprogramcaseState">
            <Radio label="01">默认</Radio>
            <Radio label="00">自定义</Radio>
          </RadioGroup><br/>
          <Select v-model="config.miniprogramcase" :label-in-value="label" multiple style="width:400px" @on-change="setOption" v-if="config.miniprogramcaseState !== '01'">
            <Option v-for="item in productCategory" :value="item.categoryId" :key="item.categoryId">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem label="新闻列表：" style="margin-top:30px" >
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
        <FormItem :label="user.enterpriseName + '头条：'" style="margin:50px 0 30px 0">
          <Input v-model="config.video.vTenText" class="w180" style="margin-bottom:10px"></Input><br/>
          <Input v-model="config.video.vTenContent" class="w180" style="margin-bottom:10px"></Input><br/>
          <Input v-model="config.video.vTen" placeholder="请输入视频链接"></Input><Button class="submit" @click="defalutVideo('vTen')">默认</Button>
        </FormItem>
        <FormItem label="上传小程序码" style="margin-bottom:20px">
          <JImage :src="config.miniprogramcode" @on-change="picChange2" :width="104"/>
        </FormItem>
      </Form>
      <Modal
        class-name="iframe-edit"
        v-model="modal"
        title="编辑"
        width="850">
        <iframe :src="src" style="width:820px;height:650px;"></iframe>
        <div slot="footer" style="display:none"></div>
      </Modal>
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
import JBanner from '@/components/group/j-banner'
import Category from '@/components/group/j-category'
export default {
  components: {
    JHeader,
    JImage,
    JBanner,
    Category
  },
  computed: {
    ...mapState(['user', 'config', 'productCategory'])
  },
  data () {
    return {
      modal: false,
      cateList: [],
      video: {
        vTen: 'https://v.qq.com/x/page/a0826kslr5q.html'
      },
      type: '',
      src: '',
      label: true
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
    this.getCate()
    if (this.productCategory.length === 0) this.$store.dispatch('getCategory', 'product')
  },
  methods: {
    getCate () {
      this.$http.request({
        url: '/rest/api/category/news?pageSize=1000'
      }).then((res) => {
        if (res.success) {
          this.cateList = res.attributes.data
        } else {
          console.log('category/news:' + res.msg)
        }
      })
    },
    picChange (e) {
      this.config.wxappLogo = e.src
    },
    picChange2 (e) {
      this.config.miniprogramcode = e.src
    },
    edit (e) {
      if ((this.type === 'product_category' || this.type === 'news_category') && (e === 'product_category' || e === 'news_category')) {
        this.src = ''
        setTimeout(() => {
          this.src = 'http://www.jihui88.com/manage_v4/index.html?win=small&lanId=1#/' + e
        }, 100)
      } else {
        this.src = 'http://www.jihui88.com/manage_v4/index.html?win=small&lanId=1#/' + e
      }
      this.type = e
      this.modal = true
    },
    defalutVideo (e) {
      this.$set(this.config.video, e, this.video[e])
    },
    setOption (value) {
      let ctx = this
      let list = []
      if (value.length > 0) {
        value.forEach(item => {
          list.push({
            value: item.label,
            key: ctx.encodeId(item.value)
          })
        })
      }
      this.config.video.miniprogramcaseSelect = list
    },
    submit () {
      this.config.video.miniprogramcase = this.config.miniprogramcase
      this.config.video.miniprogramcaseState = this.config.miniprogramcaseState
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

<style lang="less">
.submit{
  width:70px;
}
.iframe-edit{
  .ivu-modal-footer{
    display: none
  }
}
.j_agent_miniprogram{
  .j_header{
    padding-bottom: 0;
  }
  .j_header_title{
    border-bottom: none;
  }
}
</style>
