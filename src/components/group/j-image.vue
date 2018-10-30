<template>
  <div class="j_image" @click="open" :style="{width: width+'px', height: width+'px', lineHeight: width+'px'}">
    <img :src="$store.state.status.IMG_HOST+src" alt="" v-if="src">
    <div class="null_pic" v-if="!src">
      上传
    </div>
    <Upload ref="upload" :action="'/commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace00=&attId=&id='"
      :multiple="true"
      :show-upload-list="true"
      name="Filedata"
      :max-size="2048"
      :on-success="handleSuccess"
      :on-exceeded-size="handleMaxSize">
        <Button type="info" slot="content" style="display:none"><i class="iconfont icon-shangchuan"></i>上传图片到当前目录</Button>
    </Upload>
  </div>
</template>

<script>
export default {
  props: {
    src: {},
    width: {
      type: Number,
      default: 100
    },
    title: {
      type: String,
      default: '相册'
    }
  },
  methods: {
    open () {
      this.$refs.ablum.open()
    },
    handleSuccess (res, file) {
      this.$store.commit('setLoading', false)
      if (res !== null) {
        this.$emit('on-success', {
          id: res.split(',')[1],
          src: res.split(',')[0].split('http://img.jihui88.com/')[1].replace(/_5/g, ''),
          name: res.split(',')[2]
        })
      }
      var ctx = this
      if (this) {
        setTimeout(function () {
          ctx.$refs.upload.clearFiles()
        }, 3000)
      }
    },
    handleMaxSize (file) {
      this.$store.commit('setLoading', false)
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + file.name + ' 太大，不能超过2M。'
      })
    },
    picChange (e) {
      this.$emit('on-change', e)
    }
  }
}
</script>

<style lang="less">
.j_image{
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  img {
    vertical-align: middle;
    max-width: 100%;
    max-height: 100%;
  }
  .null_pic{
    background: #f5f6fa;
    text-align: center;
    color: #9b9b9b;
  }
}
</style>
