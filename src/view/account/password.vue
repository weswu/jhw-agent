<template>
  <Layout class="j_layout_content j_form_detail">
    <JHeader :title="'修改登录密码'"/>
    <Content>
      <Form ref="modal" :model="model" :rules="rules" :label-width="110" class="j_password">
        <FormItem label="旧密码" prop="oldpassword">
          <Input v-model="model.oldpassword" type="password" placeholder="请输入旧密码"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newpassword">
          <Input v-model="model.newpassword" type="password" placeholder="请输入新密码"></Input>
        </FormItem>
        <FormItem label="再次输入新密码" prop="newpassword2">
          <Input v-model="model.newpassword2" type="password" placeholder="请再次输入新密码"></Input>
        </FormItem>
        <FormItem style="margin-top:15px;">
          <Button type="primary" size="small" @click="submit">修改</Button>
        </FormItem>
      </Form>
    </Content>
  </Layout>
</template>

<script>
import qs from 'qs'
import JHeader from '@/components/group/j-header'
export default {
  components: {
    JHeader
  },
  data () {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('旧密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('旧密码不能小于6位'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('新密码不能小于6位'))
      } else {
        if (this.model.newpassword2 !== '') {
          // 对第二个密码框单独验证
          this.$refs.modal.validateField('newpassword2')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('新密码不能小于6位'))
      } else if (value !== this.model.newpassword) {
        callback(new Error('新密码不相同'))
      } else {
        callback()
      }
    }
    return {
      modal: false,
      model: {
        oldpassword: '',
        newpassword: '',
        newpassword2: ''
      },
      rules: {
        'oldpassword': [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        'newpassword': [
          { validator: validatePass, trigger: 'blur' }
        ],
        'newpassword2': [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['modal'].validate((valid) => {
        if (valid) {
          this.$http.request({
            url: '/rest/api/agent/password',
            data: qs.stringify(this.model),
            method: 'post'
          }).then((res) => {
            if (res.success) {
              this.$Message.success('密码修改成功')
            } else {
              this.$Message.success(res.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
