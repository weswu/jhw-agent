<template>
  <Layout class="j_layout_content">
    <JHeader :title="'站点详情'"></JHeader>
    <Content>
      <ul class="static_info j_scroll">
        <li class="item" v-for="item in list" :key="item.id">
          <p>
            <span class="name">{{item.seoTitle}}</span>
            <span>(网站编号：
              <Badge dot :count="item.count">
                {{item.id}}
              </Badge>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              语言：<span v-html="lanFilter(item.language)"></span>
              &nbsp;&nbsp;/&nbsp;&nbsp;
              版本：{{item.siteVersion}}
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
        </li>
      </ul>
      <JPagination :fixed="true" :total="total" :searchData='searchData' @on-change="get"></JPagination>
    </Content>
  </Layout>
</template>

<script>
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    JPagination
  },
  data () {
    return {
      list: [],
      searchData: {
        page: 1,
        pageSize: 4,
        sortType: 'desc'
      },
      total: 0
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.request({
        url: '/rest/pc/api/baselayout/listLayoutByEnterpriseId?enterpriseId=' + this.$route.params.id,
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    }
  }
}
</script>

<style lang="less">

</style>
