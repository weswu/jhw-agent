<template>
  <Upload id="fileUpload" ref="upload" :action="'/commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=' + replace + '&attId=' + attId + '&id=' + albumId"
    :multiple="true"
    :show-upload-list="true"
    name="Filedata"
    :max-size="2048"
    :on-success="handleSuccess"
    :on-exceeded-size="handleMaxSize">
    <div class="j_image" :style="{width: width+'px', height: width+'px', lineHeight: width+'px'}">
      <img :src="'http://img.jihui88.com/'+src" alt="" v-if="src">
      <div class="null_pic" v-if="!src">
        上传
      </div>
    </div>
  </Upload>
</template>

<script>
export default {
  props: {
    albumId: '',
    replace: '00',
    attId: '',
    src: {},
    width: {
      type: Number,
      default: 100
    }
  },
  methods: {
    handleSuccess (res, file) {
      this.$store.commit('setLoading', false)
      if (res !== null) {
        this.$emit('on-change', {
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
