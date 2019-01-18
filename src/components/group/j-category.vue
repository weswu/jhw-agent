<template>
  <div class="j_category_multiple">
    <div
      :key="index"
      v-for="(item, index) in list">
      <span @click="itemClick(index)">
        <CategorySelect :categoryId.sync="item" :list="categoryList" @on-change="change(item)"/>
      </span>
      <span v-if="index === 0">
        <span class="a_normal" style="padding-left:10px;" @click="add">新增分类</span>
      </span>
      <span v-if="index > 0" class="a_normal" style="padding-left:10px;" @click="del(index)">删除分类</span>
    </div>
  </div>
</template>

<script>
import CategorySelect from '@/components/group/j-category-select'
export default {
  components: {
    CategorySelect
  },
  props: {
    categoryList: Array
  },
  data () {
    return {
      list: [''],
      index: 0
    }
  },
  methods: {
    open (category) {
      this.list = category.split(',')
    },
    itemClick (e) {
      this.index = e
    },
    change (e) {
      this.list[this.index] = e
    },
    add () {
      this.list.push(this.categoryList[0].categoryId)
    },
    del (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
</style>
