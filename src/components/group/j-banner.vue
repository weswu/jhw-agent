<template>
  <ul class="j_picture">
    <li class="j_picture_item" v-for="(item, index) in list" :key="index">
      <img :src="'http://img.jihui88.com/'+item.serverPath">
      <div class="bom" @click="del(item, index)">
        删除
      </div>
      <div class="update" @click="open(item, index)">
        重新上传
      </div>
    </li>
    <li class="j_picture_item" @click="add">
      添加
    </li>
    <Upload ref="upload" :action="'/commonutil/uploadUtil2?username=' + $store.state.user.username + '&replace=' + replace + '&attId=' + attId + '&id=' + albumId"
      :multiple="true"
      :show-upload-list="true"
      name="Filedata"
      :max-size="2048"
      :on-success="handleSuccess"
      :on-exceeded-size="handleMaxSize">
      <div class="j_image" id="picUpload" style="display:none">
        <div class="null_pic">
          上传
        </div>
      </div>
    </Upload>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      replace: '00',
      attId: '',
      albumId: '',
      list: []
    }
  },
  created () {
    this.getAlbum()
  },
  methods: {
    getAlbum () {
      this.$http.request({
        url: '/rest/api/album/list?page=1&pageSize=1000'
      }).then((res) => {
        if (res.success) {
          let data = res.attributes.data
          data.forEach(item => {
            if (item.name === '[系统]微信小程序Banner相册') {
              this.getBanner(item.albumId)
            }
          })
        } else {
          console.log('album/list:' + res.msg)
        }
      })
    },
    getBanner (id) {
      this.albumId = id
      this.$http.request({
        url: '/rest/api/album/attr/list/' + id
      }).then((res) => {
        if (res.success) {
          this.list = res.attributes.data
        } else {
          console.log('album/attr/list/id:' + res.msg)
        }
      })
    },
    open (item, index) {
      this.index = index
      this.replace = '01'
      this.attId = item.attId
      var btn = document.getElementById('picUpload')
      btn.click()
    },
    add () {
      this.index = ''
      this.replace = '00'
      this.attId = ''
      var btn = document.getElementById('picUpload')
      btn.click()
    },
    del (item, index) {
      this.$http.request({
        url: '/rest/api/album/attr/img/delete?attIds=' + item.attId,
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.list.splice(index, 1)
        } else {
          console.log('album/attr/img/delete:' + res.msg)
        }
      })
    },
    handleSuccess (res, file) {
      this.$store.commit('setLoading', false)
      if (res !== null) {
        let item = {
          attId: res.split(',')[1],
          serverPath: res.split(',')[0].split('http://img.jihui88.com/')[1].replace(/_5/g, ''),
          filename: res.split(',')[2]
        }
        if (this.index) {
          this.list[this.index].attId = item.attId
          this.list[this.index].serverPath = item.serverPath
          this.list[this.index].filename = item.filename
        } else {
          this.list.splice(0, 0, item)
        }
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
.j_picture{
  position: relative;
  .j_picture_item{
    width: 104px;
    height: 104px;
    line-height: 104px;
    float: left;
    cursor: pointer;
    display: table-cell;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    background: #f5f6fa;
    overflow: hidden;
    color: #9b9b9b;
    &:hover{
      .bom{
         opacity: 1
      }
      .update{
         opacity: 1
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }
    .bom{
      position: absolute;
      left: 0px;
      bottom: 0px;
      z-index: 10;
      background: #f5f6fa;
      border-top: 1px solid #c9c9c9;
      width: 104px;
      height: 25px;
      color: #999;
      line-height: 25px;
      opacity: 0;
      transition: 0.3s ease;
      i{
        color: #437708;
        font-size: 22px;
        float: left;
        width: 30%;
      }
      .icon-x{
        color: #d0021b;
        font-size: 14px;
      }
    }
    .update{
      opacity: 0;
      background: rgba(0,0,0,0.5);
      color: #fff;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 9;
      transition: 0.3s ease;
    }
  }
}
</style>
