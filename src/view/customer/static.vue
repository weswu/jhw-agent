<template>
  <Layout class="j_layout_content">
    <JHeader :title="'站点列表'"></JHeader>
    <Content>
      <div class="j_tip" style="margin-top:0">
        温馨提醒：<a href="http://pc.jihui88.com/pc/admin.html" target="_blank">版块制作</a>
      </div>
      <ul class="static_info j_scroll">
        <li class="item" v-for="item in list" :key="item.id">
          <p>
            <span class="name">{{item.seoTitle}}</span>
            <span>(网站编号：
              {{item.id}}
              &nbsp;&nbsp;/&nbsp;&nbsp;
              语言：<span v-html="lanFilter(item.language)"></span>
              )</span>
            <!-- 状态 -->
            <span v-html="stateFilter(item.state)"></span>
            <span v-html="onlineFilter(item.bind.online)"></span>
            <span class="country" v-html="countryFilter(item.country)"></span>
          </p>
          <p>
            <a :href="item.url | http" target="_blank" class="url">{{item.url}}</a>
            <span class="time" v-if="item.endTime">(到期时间：{{item.endTime | time}})</span>
          </p>
          <p class="more">
            <a :href="'http://pc.' + user.bindUrl + '/pc/design.html?layoutId=' + item.id" target="_blank" class="a_underline">进入编辑</a>
            <Poptip placement="top" class="j_poptip_ul">
              <span class="a_underline">更多选项</span>
              <ul slot="content">
                <Poptip placement="right" width="200"
                  confirm
                  title="是否关闭网站？"
                  @on-ok="closeStatic(item.id)">
                  <li> 关闭网站 </li>
                </Poptip>
                <li @click="openStatic(item.id)"> 恢复网站 </li>
                <li @click="del(item.id)"> 删除网站 </li>
              </ul>
            </Poptip>
          </p>
        </li>
      </ul>
      <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="get"></JPagination>
    </Content>
    <Modal v-model="modalDel" width="360" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>请谨慎！</span>
      </p>
      <div style="text-align:left;text-indent: 25px;line-height: 1.7;">
        <p>站点（网站编号：{{id}}）将会被彻底删除，站点（网站编号：{{id}}）下的网站页面内容、到期时间等将永久失效（注：公司信息、产品、相册及新闻将会保留）。不建议删除未到期的站点。如果您真的确定要删除站点，请点击【确认】。</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="delItem">确认</Button>
      </div>
    </Modal>
  </Layout>
</template>

<script>
import qs from 'qs'
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    JPagination
  },
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      list: [],
      listTest: [
        {
          id: '99',
          seoTitle: '我的网站',
          new: false,
          state: '00',
          url: '',
          language: '1',
          count: 1,
          country: 'cn',
          bind: {
            address: '',
            country: 'cn',
            online: '01'
          }
        }
      ],
      searchData: {
        page: 1,
        pageSize: 4,
        sortType: 'desc',
        enterpriseId: ''
      },
      total: 0,
      onlineCount: 0,
      lanList: [
        { value: '1', text: '中文', type: 'cn' },
        { value: '2', text: '英文', type: 'en' }
      ],
      countryType: [
        { text: '中国', value: 'cn' },
        { text: '美国', value: 'en' },
        { text: '香港', value: 'hc' }
      ],
      id: '',
      modalDel: false,
      modal_loading: false
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.searchData.enterpriseId = this.decodeId(this.$route.params.id, 'Enterp_', 32)
      this.$http.request({
        url: '/rest/pc/api/baseLayout/listLayoutByEnterpriseId?' + qs.stringify(this.searchData),
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          res.attributes.data.forEach(item => {
            if (item.bind.address) {
              item.url = item.bind.address
            } else {
              item.url = 'http://pc.' + this.user.bindUrl + '/rest/site/' + item.id + '/index'
            }
          })
          this.list = res.attributes.data
          this.onlineCount = res.attributes.onlineCount
        }
      })
    },
    del (id) {
      this.id = id
      this.modalDel = true
    },
    delItem () {
      this.modal_loading = true
      this.$http.request({
        url: '/rest/api/agent/order/deleteLayout?layoutId=' + this.id,
        method: 'post'
      }).then((res) => {
        this.modal_loading = false
        if (res.success) {
          this.$Message.success('删除成功')
          this.modalDel = false
          this.get()
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    closeStatic (id) {
      this.$http.request({
        url: '/rest/api/agent/order/closeLayout?layoutId=' + id,
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('关闭网站成功')
          this.get()
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    openStatic (id) {
      this.$http.request({
        url: '/rest/api/agent/order/openLayout?layoutId=' + id,
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success('恢复网站成功')
          this.get()
        } else {
          this.$Message.success(res.msg)
        }
      })
    },
    // 过滤
    lanFilter (val) {
      let text = ''
      this.lanList.forEach(item => {
        if (item.value === val) {
          text = item.text
        }
      })
      return text
    },
    stateFilter (val) {
      let text = ''
      if (val === '0') text = '<span class="type">未开通</span>'
      if (val === '1') text = '<span class="type">已开通</span>'
      if (val === '3') text = '<span class="type">已删除</span>'
      if (val === '4') text = '<span class="type">已关闭</span>'
      return text
    },
    onlineFilter (val) {
      let text = ''
      if (val === '00') text = '<span class="type">未上线</span>'
      if (val === '01') text = '<span class="type">已上线</span>'
      return text
    },
    countryFilter (val) {
      let text = ''
      this.countryType.forEach(item => {
        if (item.value === val) {
          text = item.text + '机房'
        }
      })
      return text
    }
  }
}
</script>

<style lang="less">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal{
    top: 0;
  }
}
.static_info{
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  color: #b9b9b9;
  .j_poptip_ul .ivu-poptip-body .ivu-poptip-body {
      padding: 16px 16px 8px;
  }
  .ivu-badge{
    color: #777;
    padding-right: 5px;
    .ivu-badge-dot{
      background: #ff6700;
    }
  }
  .item{
    border-top: 1px solid #e9e9e9;
    padding: 0 18px;
    &:first-child{
      border-top: none;
    }
    &:hover{
      background: #f9f9fa;
    }
    .name{
      color: #595959;
      padding-right: 15px;
    }
    i{
      font-size: 12px;
      color: #9dabb5;
      margin-right: 18px;
      cursor: pointer;
    }
    .type{
      background: #d3d3d3;
      color: #fff;
      padding: 3px 5px;
      margin-left: 10px;
      &.red{
        background: #d0021b
      }
      &.green {
        background: #417505
      }
    }
    .country{
      float:right;
    }
    .url {
      color: #b9b9b9;
    }
    .time{
      margin: 0 8px 0 14px;
    }
    .buy{
      color: #939393;
      text-decoration: underline;
      margin-right: 3px;
    }
    .more{
      a{
        margin-right: 18px;
      }
    }
    p{
      border-bottom: 1px solid #e9e9e9;
      line-height: 30px;
      padding: 15px 0;
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
</style>
