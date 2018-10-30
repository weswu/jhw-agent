<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'客户订单列表'" :tip="'温馨提醒：'"/>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="name" class="w180" clearable placeholder="请输入搜索内容" @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
          </Col>
          <Col>
            <span style="color:#999">选择到期时间段：</span>
            <DatePicker type="daterange" :options="options" split-panels @on-change="searchDate" style="width: 132px"></DatePicker>
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
        { title: '订单编号', key: 'enterprise.name', className: 'text-color', render: this.nameFilter },
        { title: '产品名称', key: 'enterprise.name', className: 'text-color', render: this.nameFilter },
        { title: '创建时间', key: 'addTime', render: this.dataFilter },
        { title: '站点', key: 'layoutId', render: this.staticFilter },
        { title: '金额', key: 'state', render: this.stateFilter },
        { title: '到期时间', key: 'addTime', render: this.dataFilter },
        { title: '操作', className: 'j_table_operate', width: 80, render: this.renderOperate }
      ],
      list: [],
      name: '',
      searchData: {
        page: 1,
        pageSize: 10,
        startDate: '',
        endDate: ''
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
        url: '/rest/api/agent/member/list',
        data: qs.stringify(this.searchData),
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    // 功能
    clearInput () {
      if (this.name === '') {
        this.searchData.name = this.name
        this.get()
      }
    },
    search () {
      this.searchData = {
        page: 1,
        pageSize: this.searchData.pageSize,
        name: this.name
      }
      this.get()
    },
    searchDate (e) {
      this.searchData.startDate = e[0]
      this.searchData.endDate = e[1]
    },
    // 过滤
    nameFilter (h, params) {
      return h('span', params.row.enterprise.name || '')
    },
    // 时间格式化
    dataFilter (h, params) {
      return h('div', this.dateFormat(params.row.addTime))
    },
    stateFilter (h, params) {
      return h('span', params.row.state === '01' ? '正常' : (params.row.state === '00' ? '未审核' : '审核未通过'))
    },
    staticFilter (h, params) {
      return h('span', [
        h('a', {
          style: {
            color: '#999'
          },
          on: {
            click: () => {
            }
          }
        }, '查看详情')
      ])
    },
    renderOperate (h, params) {
      return h('div', [
        h('a', {
          on: {
            click: () => {
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
