<template>
  <Layout class="j_layout_content">
    <JHeader :title="'站点列表'"></JHeader>
    <Content>
      <div class="j_tip" style="margin-top:0">
        温馨提醒：<a href="http://pc.jihui8.com/pc/admin.html" target="_blank">版块制作</a>
      </div>
      <ul class="static_info j_scroll">
        <li class="item" v-for="item in list" :key="item.id">
          <p>
            <span class="name">{{item.seoTitle}}</span>
            <span>(网站编号：
              {{item.id}}
              &nbsp;&nbsp;/&nbsp;&nbsp;
              语言：<span v-html="lanFilter(item.language)"></span>
              <span v-if="item.siteVersion">&nbsp;&nbsp;/&nbsp;&nbsp;
              版本：{{item.siteVersion}}</span>
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
          </p>
        </li>
      </ul>
      <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="get"></JPagination>
    </Content>
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
      ]
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
    // 过滤
    lanFilter (val) {
      let text = ''
      if (val === '0') text = '<span class="type">未开通</span>'
      if (val === '1') text = '<span class="type">已开通</span>'
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

.static_info{
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  color: #b9b9b9;
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
