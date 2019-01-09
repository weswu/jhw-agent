<template>
  <Layout class="j_layout_content j_form_detail j_agent_register">
    <JHeader :title="'注册功能设置'" :tip="tip"/>
    <Content>
      <div class="j_tip" style="margin-top:0">
        短信设置流程：<br/>
        1、<a href="https://home.console.aliyun.com/new#/" target="_blank">进入阿里云</a> -> 产品与服务   -> 云通信 -> 短信服务<br/>
        2、签名添加：产品与服务   -> 云通信 -> 短信服务 -> 国内消息 -> 签名管理<br/>
        3、模板添加：产品与服务   -> 云通信 -> 短信服务 -> 国内消息 ->模版管理<br/>
        4、短信注册验证码模板设置：<a href="https://download.wunderlist.io/d1409f90-f14a-0136-3dfa-22000a097af6-1546495238-292298?AWSAccessKeyId=AKIAJEN6W4AO3LJODOAA&Expires=1549173641&Signature=%2Bh69g890wo%2FDdWJBlVYQLppKsqs%3D" target="_blank">详见图</a><br/>
        5、短信通知代理商会员注册信息模板设置：<br/>有新会员注册，账号：${username}, 手机号码：${cellphone}
      </div>
      <Form :model="config" :label-width="220" ref="model">
        <FormItem label="是否开启短信注册功能：">
          <RadioGroup v-model="config.openCellphoneRegister">
            <Radio label="01">开启</Radio>
            <Radio label="00">关闭</Radio>
          </RadioGroup>
        </FormItem>
        <div v-if="config.openCellphoneRegister === '01'">
          <FormItem label="阿里短信accessKeyId：">
            <Input v-model="config.accessKeyId" placeholder="请输入阿里短信accessKeyId"></Input>
          </FormItem>
          <FormItem label="阿里短信accessKeySecret：">
            <Input v-model="config.accessKeySecret" placeholder="请输入阿里短信accessKeySecret"></Input>
          </FormItem>
          <FormItem label="阿里短信签名：">
            <Input v-model="config.signName" placeholder="请输入阿里短信签名"></Input>
          </FormItem>
          <FormItem label="短信验证码模板ID：">
            <Input v-model="config.cellphoneTemplteCode" placeholder="请输入短信验证码模板ID"></Input>
          </FormItem>
        </div>
        <FormItem label="会员注册成功后短信通知给经销商：">
          <RadioGroup v-model="config.registerNotifyAgent">
            <Radio label="01">开启</Radio>
            <Radio label="00">关闭</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="短信注册成功后通知给代理商：" v-if="config.registerNotifyAgent === '01'">
          <Input v-model="config.notifyTemplateCode" placeholder="请输入短信注册成功后留言"></Input>
        </FormItem>
      </Form>
    </Content>
    <Footer>
      <Button type="primary" size="small" @click="submit">保存</Button>
    </Footer>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  computed: {
    ...mapState(['user', 'config'])
  },
  data () {
    return {
      tip: ''
    }
  },
  created () {
    if (!this.config.configId) this.$store.dispatch('getConfig')
  },
  methods: {
    submit () {
      this.$store.dispatch('setConfig', this.config)
      let ctx = this
      setTimeout(function () {
        ctx.$Message.success('保存成功')
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.j_agent_register{
  .j_header{
    padding-bottom: 0;
  }
  .j_header_title{
    border-bottom: none;
  }
}
</style>
