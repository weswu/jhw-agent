<template>
  <ul class="j_picture">
    <li class="j_picture_item" v-for="(item, index) in list" :key="index">
      <img :src="'http://img.jihui88.com/'+item.serverPath">
      <div class="bom">
        <span @click="edit(item, index)">编辑</span>
        <span @click="del(item, index)">删除</span>
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
    <Modal
      class-name="j_edit_item"
      width="276"
      v-model="itemModel"
      title="编辑图片"
      @on-ok="editItem">
      <Input v-model="item.filename" class="w244" placeholder="图片名称"></Input><br/>
      <Input v-model="item.linkUrl" class="w244" placeholder="链接地址"></Input><br/>
      排序：<InputNumber v-model="item.sort" placeholder="排序"></InputNumber>
    </Modal>
  </ul>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      index: 0,
      replace: '00',
      attId: '',
      albumId: '',
      itemModel: false,
      item: {},
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
              this.albumId = item.albumId
              this.getBanner(item.albumId)
            }
          })
        } else {
          console.log('album/list:' + res.msg)
        }
      })
    },
    getBanner () {
      this.$http.request({
        url: '/rest/api/album/attr/list/' + this.albumId
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
    edit (item, index) {
      this.itemModel = true
      this.item = item
    },
    editItem () {
      let data = {
        model: JSON.stringify({
          id: this.item.attId,
          filename: this.item.serverPath,
          sort: this.item.sort,
          linkUrl: this.item.linkUrl,
          editField: true
        }),
        _method: 'put'
      }
      this.$http.request({
        url: '/rest/api/album/attr/img/detail/' + this.item.attId,
        data: qs.stringify(data),
        method: 'post'
      }).then((res) => {
        if (res.success) {
          this.getBanner()
          this.$Message.success('修改成功')
        } else {
          this.$Message.error(res.msg)
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
.j_edit_item .ivu-input-wrapper {
  margin-bottom: 10px;
}
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
      span{
        width: 50%;display: inline-block;
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
