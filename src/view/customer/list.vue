<template>
  <Layout class="j_layout_content">
    <Content>
      <JHeader :title="'客户列表'" :tip="'温馨提醒：'"/>
      <div class="j_search">
        <Row type="flex" justify="space-between">
          <Col>
            <Input v-model="searchData.searchKey" class="w180" clearable placeholder="请输入搜索内容"></Input>
            <Button class="search" @click="search">搜索</Button>
          </Col>
          <Col>
            <span style="color:#999">选择注册时间段：</span>
            <DatePicker type="daterange" :options="options" split-panels @on-change="searchDate" style="width: 132px"></DatePicker>
            <Button class="search" @click="get">搜索</Button>
          </Col>
        </Row>
      </div>
      <Table ref="selection" :columns="columns" :data="list"/>
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
        { title: '名称', key: 'enterprise.name', className: 'text-color', render: this.nameFilter },
        { title: '注册时间', key: 'addTime', render: this.dataFilter },
        { title: '状态', key: 'state', maxWidth: 100, render: this.stateFilter },
        { title: '生成的站点', key: 'layoutId', render: this.staticFilter },
        { title: '操作', className: 'j_table_operate', width: 190, render: this.renderOperate }
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
            'address': '',
            'name': 'AAAA',
            'key': null,
            'type': '  ',
            'annualImport': null,
            'mainBusiness': null,
            'annualExport': null,
            'registeredCapital': null,
            'legalPersonCellphone': null,
            'businessPattern': null,
            'siteServiceType': null,
            'businessType': null,
            'annualTurnover': null,
            'domainCertPic': null,
            'qualityControl': null,
            'legalPersonIdNumber': null,
            'legalPersonBust': null,
            'bankAccount': null,
            'redicpNumber': null,
            'legalPersonPhoto': null,
            'factoryArea': null,
            'icon': null,
            'enterpriseId': 'Enterp_0000000000000000000005980',
            'edesc': null,
            'url': 'admin.jihui88.com/site/jhweyjwv',
            'userId': 'User_000000000000000000000006290',
            'email': null,
            'icp': null,
            'lanId': 1,
            'industry': '',
            'phone': null,
            'regTime': null,
            'legalPre': null,
            'staffSum': null,
            'dist': null,
            'rdSum': null,
            'broadcast': null,
            'ipadSite': null,
            'entAddress': '未填写',
            'mobileCode': null,
            'qasyscert': null,
            'bank': null,
            'gsbsEjym': null,
            'logo': null,
            'brand': null,
            'tel400true': null,
            'sincerity': null,
            'customer': null,
            'monthProd': null,
            'oem': null,
            'guess': null,
            'mapaddress': null,
            'gsbsZym': null,
            'market': null,
            'mobileSite': null,
            'tel400': null,
            'certType': null,
            'certNumber': null,
            'psr': null,
            'certPic': null
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
  created () {
    this.get()
  },
  methods: {
    get () {
      this.$http.request({
        url: '/rest/api/agent/member/list?' + qs.stringify(this.searchData),
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
              this.$router.push({ path: '/member/order/' + this.encodeId(params.row.userId) })
            }
          }
        }, '创建')
      ])
    }
  }
}
</script>

<style lang="less">
</style>
