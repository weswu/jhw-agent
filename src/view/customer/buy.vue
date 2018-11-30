<template>
  <Layout class="j_layout_content">
    <JHeader :title="$route.meta.menu[active].text"/>
    <Content>
      <div v-if="active === '0'">
        <div class="j_search">
          <Row type="flex" justify="space-between">
            <Col>
              <Input v-model="searchData.searchkey" class="w180" clearable placeholder="请输入搜索内容" @on-change="clearInput"></Input>
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
      </div>

      <Form :model="detail" :label-width="130" v-if="active === '1'">
        <FormItem label="金额：">
          <InputNumber v-model="detail.amount" placeholder="请输入金额"></InputNumber>
        </FormItem>
        <FormItem label="续费年限：">
          <Select v-model="detail.year" class="w180" placeholder="请选择开通年限">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
          </Select><span class="j_unit">年</span>
        </FormItem>
      </Form>
    </Content>
    <Footer v-if="active === '1'">
      <Button type="primary" size="small" @click="submit">添加</Button>
    </Footer>
    <Detail ref='detail' @on-change="get"/>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
import JPagination from '@/components/group/j-pagination'
import Detail from '@/view/customer/buyDetail'
export default {
  components: {
    JHeader,
    JPagination,
    Detail
  },
  data () {
    return {
      modal: false,
      detail: {},
      columns: [
        { title: '企业账号', key: 'username', className: 'text-color', ellipsis: true },
        { title: '订单编号', key: 'orderSn', className: 'text-color' },
        { title: '产品名称', key: 'productName' },
        { title: '应付金额', key: 'amount' },
        { title: '使用年限', key: 'year' },
        { title: '购买时间', render: this.dataFilter },
        { title: '到期时间', render: this.endTimeFilter },
        { title: '审核状态', render: this.stateFilter },
        { title: '操作', className: 'j_table_operate', width: 80, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          'endTime': 1543665647571, // 到期时间
          'username': 'jihui88', // 账号
          'amount': 0, // 金额
          'productType': 'pc', // 产品类型
          'userId': 'User_000000000000000000000001220',
          'productId': '1326',
          'addTime': 1541073644760,
          'orderSn': '1541073644',
          'orderId': 'OrderAgent_000000000000000000001',
          'productName': '网站(展示)',
          'agentId': 'User_000000000000000000000006291',
          'year': 1,
          'orderType': '01',
          'orderStatus': '00'
        }
      ],
      active: '0',
      name: '',
      searchData: {
        page: 1,
        pageSize: 10,
        orderId: '',
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
      this.searchData.orderId = this.$route.params.id
      this.$http.request({
        url: '/rest/api/agent/order/listRenew?' + qs.stringify(this.searchData),
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          this.list = res.attributes.data
        }
      })
    },
    // 添加
    add () {
      this.modal = true
    },
    submit () {
      this.detail.orderId = this.$route.params.id
      this.$http.request({
        url: '/rest/api/agent/order/addRenew',
        data: qs.stringify(this.detail),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.modal = false
          this.detail = {}
          this.get()
          this.$Message.success('创建成功')
        } else {
          this.$Message.error(res.msg)
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
    stateFilter (h, params) {
      let text = ''
      if (params.row.orderStatus === '00') text = '未审核'
      if (params.row.orderStatus === '01') text = '审核通过'
      if (params.row.orderStatus === '02') text = '审核未通过'
      return h('span', text)
    },
    renderOperate (h, params) {
      return h('div', [
        h('a', {
          on: {
            click: () => {
              this.$refs.detail.open(params.row.orderId)
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
