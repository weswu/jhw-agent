<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'客户列表'" :tip="'温馨提醒：可搜索内容为“企业账号”、“公司名称”'"/>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.searchKey" class="w180" clearable placeholder="请输入搜索内容" @on-change="clearInput"></Input>
            <Button class="search" @click="search">搜索</Button>
          </Col>
          <Col>
            <span style="color:#999">选择注册时间段：</span>
            <DatePicker type="daterange" :options="options" split-panels clearable @on-clear="clearTime" @on-change="searchDate"></DatePicker>
            <Button class="search" @click="search">搜索</Button>
          </Col>
        </Row>
      </div>
      <Table highlight-row ref="selection" :columns="columns" :data="list"/>
      <JPagination :total="total" :searchData='searchData' @on-change="get"/>
    </Content>
    <Modal
      v-model="modal"
      width="400"
      title="设置"
      @on-cancel="modal = false">
      <div slot="footer">
        <Button type="text" size="large" @click="modal = false">取消</Button>
        <Button type="primary" size="large" @click="submit">保存</Button>
      </div>
      <Form :label-width="100">
        <FormItem label="公司名称:">
          <Input v-model="enterpriseName" style="width:180px"></Input>
        </FormItem>
      </Form>
    </Modal>
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
      modal: false,
      index: 0,
      enterpriseName: '',
      columns: [
        { title: '企业账号', key: 'username', className: 'text-color', ellipsis: true },
        { title: '公司名称', className: 'text-color', render: this.nameFilter },
        { title: '注册时间', key: 'addTime', render: this.dataFilter },
        { title: '状态', key: 'state', maxWidth: 100, render: this.stateFilter },
        { title: '生成的站点', key: 'layoutId', render: this.staticFilter },
        { title: '操作', className: 'j_table_operate', width: 210, render: this.renderOperate }
      ],
      list: [],
      listTest: [
        {
          'address': null,
          'name': null,
          'state': '01',
          'type': '01',
          'country': null,
          'version': null,
          'position': null,
          'domain': 'admin.jihui88.com',
          'username': 'jhweyjwv',
          'password': 'e10adc3949ba59abbe56e057f20f883e',
          'posterId': null,
          'cellphone': null,
          'sex': null,
          'code': null,
          'qqfromOauth': '',
          'weixinFromOauth': '',
          'pcSitePayTime': null,
          'pwdQuestion': null,
          'mobileSitePayTime': null,
          'enterpriseId': 'Enterp_0000000000000000000005980',
          'wcdMember': null,
          'sitemap': null,
          'score': null,
          'phone24': null,
          'zipcode': null,
          'pcode': null,
          'codestate': null,
          'robotsurl': null,
          'jsonstr': null,
          'url2': null,
          'password2': '',
          'vericode': 'd27rk60jxl72egcwprpdk52oyjrir24k',
          'pwdAnswer': null,
          'weixin': null,
          'agentId': 'User_000000000000000000000001219',
          'weibo': null,
          'qq': null,
          'msn': null,
          'addTime': 1540456190748,
          'url': null,
          'grade': '00',
          'userId': 'User_000000000000000000000006290',
          'nickName': 'jhweyjwv',
          'email': null,
          'enterprise': {
            'name': 'AAAA'
          },
          'phone': null,
          'fax': null,
          'dist': null,
          'entUrl': 'http://admin.jihui88.com/site/jhweyjwv',
          'userType': null
        },
        {
          'address': null,
          'name': null,
          'state': '01',
          'type': '01',
          'country': null,
          'version': null,
          'position': null,
          'domain': 'admin.jihui88.com',
          'username': 'jhweyjwv',
          'password': 'e10adc3949ba59abbe56e057f20f883e',
          'posterId': null,
          'cellphone': null,
          'sex': null,
          'code': null,
          'qqfromOauth': '',
          'weixinFromOauth': '',
          'pcSitePayTime': null,
          'pwdQuestion': null,
          'mobileSitePayTime': null,
          'enterpriseId': 'Enterp_0000000000000000000005980',
          'wcdMember': null,
          'sitemap': null,
          'score': null,
          'phone24': null,
          'zipcode': null,
          'pcode': null,
          'codestate': null,
          'robotsurl': null,
          'jsonstr': null,
          'url2': null,
          'password2': '',
          'vericode': 'd27rk60jxl72egcwprpdk52oyjrir24k',
          'pwdAnswer': null,
          'weixin': null,
          'agentId': 'User_000000000000000000000001219',
          'weibo': null,
          'qq': null,
          'msn': null,
          'addTime': 1540456190748,
          'url': null,
          'grade': '00',
          'userId': 'User_000000000000000000000006290',
          'nickName': 'jhweyjwv',
          'email': null,
          'enterprise': {
            'name': 'AAAA'
          },
          'phone': null,
          'fax': null,
          'dist': null,
          'entUrl': 'http://admin.jihui88.com/site/jhweyjwv',
          'userType': null
        }
      ],
      searchData: {
        page: 1,
        pageSize: 10,
        searchKey: '',
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!from.meta.detail) {
        window.localStorage.setItem('memberPage', 1)
        window.localStorage.setItem('memberIndex', '')
      } else {
        vm.searchData.page = parseInt(window.localStorage.getItem('memberPage')) || 1
      }
      vm.get()
    })
  },
  methods: {
    get () {
      window.localStorage.setItem('memberPage', this.searchData.page)
      this.$http.request({
        url: '/rest/api/agent/member/list?' + qs.stringify(this.searchData),
        method: 'get'
      }).then((res) => {
        if (res.success) {
          this.total = res.attributes.count
          let data = res.attributes.data
          let idx = parseInt(window.localStorage.getItem('memberIndex'))
          data.forEach((item, index) => {
            if (idx === index) {
              item._highlight = true
            }
          })
          this.list = data
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
      if (this.searchData.searchKey === '') {
        this.get()
      }
    },
    clearTime () {
      this.searchData.startTime = ''
      this.searchData.endTime = ''
      this.get()
    },
    submit () {
      let item = this.list[this.index]
      this.$http.request({
        url: '/rest/api/agent/member/edit',
        data: qs.stringify({
          enterpriseName: this.enterpriseName,
          userId: item.userId
        }),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.$Message.success(res.msg)
          item.enterprise.name = this.enterpriseName
          this.$set(this.list, this.index, item)
        } else {
          this.$Message.error(res.msg)
        }
      })
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
              window.localStorage.setItem('memberIndex', params.index)
              this.$router.push({ path: '/member/static/' + this.encodeId(params.row.enterpriseId) })
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
              this.modal = true
              this.index = params.index
              this.enterpriseName = params.row.enterprise.name
            }
          }
        }, '设置'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              this.$http.request({
                url: '/rest/api/agent/member/resetPassword',
                data: qs.stringify({
                  userId: params.row.userId
                }),
                method: 'post'
              }).then((res) => {
                if (res.success) {
                  this.$Message.success(res.msg)
                } else {
                  this.$Message.error(res.msg)
                }
              })
            }
          }
        }, '重置密码'),
        h('span', {
          class: { delimiter: true }
        }, '|'),
        h('a', {
          on: {
            click: () => {
              window.localStorage.setItem('memberIndex', params.index)
              this.$router.push({ path: '/member/order/' + this.encodeId(params.row.userId), query: { name: params.row.enterprise.name } })
            }
          }
        }, '添加产品')
      ])
    }
  }
}
</script>

<style lang="less">
</style>
