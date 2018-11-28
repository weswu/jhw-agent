<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'续费列表'"/>
      <Table ref="selection" :columns="columns" :data="list"/>
      <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
export default {
  components: {
    JHeader,
    JPagination
  },
  data () {
    return {
      columns: [
        { title: '企业账号', key: 'username', className: 'text-color', ellipsis: true },
        { title: '订单编号', key: 'orderSn', className: 'text-color' },
        { title: '产品名称', key: 'productName' },
        { title: '创建时间', key: 'addTime', render: this.dataFilter },
        { title: '站点', render: this.staticFilter },
        { title: '金额', key: 'amount' },
        { title: '到期时间', key: 'addTime', render: this.endTimeFilter },
        { title: '审核状态', render: this.stateFilter },
        { title: '续费列表', render: this.buyFilter },
        { title: '操作', className: 'j_table_operate', width: 80, render: this.renderOperate }
      ],
      listTest: [],
      list: [
        {
          'endTime': 1543665647571,
          'username': 'jihui88',
          'amount': 0,
          'productType': 'pc',
          'userId': 'User_000000000000000000000001220',
          'productId': '1326',
          'addTime': 1541073644760,
          'orderSn': '1541073644',
          'orderId': 'OrderAgent_000000000000000000001',
          'productName': '网站(展示)',
          'agentId': 'User_000000000000000000000006291'
        }
      ],
      name: '',
      searchData: {
        page: 1,
        pageSize: 10,
        searchkey: '',
        startTime: '',
        endTime: ''
      },
      total: 0,
      options: {
        shortcuts: [
          {
            text: '7天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '15天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              return [start, end]
            }
          },
          {
            text: '30天',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          }
        ]
      }
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.request({
        url: '/rest/api/agent/order/list?' + qs.stringify(this.searchData),
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    // 功能
    search () {
      this.searchData.page = 1
      this.get()
    },
    searchDate (e) {
      this.searchData.startTime = e[0]
      this.searchData.endTime = e[1]
    },
    // 搜索
    clearInput () {
      if (this.searchData.searchkey === '') {
        this.get()
      }
    },
    // 过滤
    nameFilter (h, params) {
      return h('span', params.row.enterprise.name || '')
    },
    // 时间格式化
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    },
    endTimeFilter (h, params) {
      return h('div', this.dateFormat(params.row.endTime))
    },
    staticFilter (h, params) {
      return h('a', {
        style: {
          color: '#999'
        },
        attrs: {
          href: 'http://pc.jihui88.com/rest/site/' + params.row.productId + '/index',
          target: '_blank'
        }
      }, '查看')
    },
    stateFilter (h, params) {
      return h('span', params.row.state === '01' ? '正常' : (params.row.state === '00' ? '未审核' : '审核未通过'))
    },
    buyFilter (h, params) {
      return h('a', {
        style: {
          color: '#999'
        },
        attrs: {
          href: 'http://pc.jihui88.com/rest/site/' + params.row.productId + '/index',
          target: '_blank'
        }
      }, '查看')
    },
    renderOperate (h, params) {
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$router.push({ path: '/order/detail/' + params.row.orderId })
            }
          }
        }, '详情')
      ])
    }
  }
}
</script>

<style lang="less">
</style>
