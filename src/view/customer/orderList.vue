<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'产品订单列表'" :tip="'温馨提醒：'"/>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.searchkey" class="w180" clearable placeholder="请输入搜索内容" @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
          </Col>
          <Col>
            <span style="color:#999">选择到期时间段：</span>
            <DatePicker type="daterange" :options="options" split-panels @on-change="searchDate"></DatePicker>
            <Button class="search" @click="search">搜索</Button>
          </Col>
        </Row>
      </div>
      <Table ref="selection" :columns="columns" :data="list"/>
      <JPagination :total="total" :searchData='searchData' @on-change="get"/>
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
  data () {
    return {
      columns: [
        { title: '企业账号', key: 'username', className: 'text-color', ellipsis: true },
        { title: '公司名称', className: 'text-color', render: this.nameFilter },
        { title: '订单编号', key: 'orderSn', className: 'text-color' },
        { title: '产品名称', key: 'productName' },
        { title: '创建时间', key: 'addTime', render: this.dataFilter },
        { title: '站点', render: this.staticFilter },
        { title: '站点名称', key: 'seoTitle' },
        { title: '金额', key: 'amount' },
        { title: '到期时间', key: 'addTime', render: this.endTimeFilter },
        { title: '审核状态', render: this.stateFilter },
        { title: '续费列表', render: this.buyFilter },
        { title: '操作', className: 'j_table_operate', width: 80, render: this.renderOperate }
      ],
      list: [],
      listTest: [
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
          'agentId': 'User_000000000000000000000006291',
          'orderStatus': '00'
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
  computed: {
    ...mapState(['user'])
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
      return h('span', params.row.user.enterprise.name || '')
    },
    // 时间格式化
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    },
    endTimeFilter (h, params) {
      return h('div', this.dateFormat(params.row.endTime))
    },
    staticFilter (h, params) {
      let host = 'http://pc.' + this.user.bindUrl
      return h('a', {
        style: {
          color: '#999'
        },
        attrs: {
          href: host + '/rest/site/' + params.row.productId + '/index',
          target: '_blank'
        }
      }, '查看')
    },
    stateFilter (h, params) {
      let text = ''
      if (params.row.orderStatus === '00') text = '未审核'
      if (params.row.orderStatus === '01') text = '审核通过'
      if (params.row.orderStatus === '02') text = '审核未通过'
      return h('span', text)
    },
    buyFilter (h, params) {
      return h('a', {
        style: {
          color: '#999'
        },
        on: {
          click: () => {
            this.$router.push({ path: '/order/buy/' + params.row.orderId })
          }
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
