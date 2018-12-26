<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'小程序后台设置'" :tip="'温馨提醒：'"/>
    <Content>
      <Form :model="config" :label-width="130">
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
      type: '',
      cateList: [],
      video: {}
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
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
