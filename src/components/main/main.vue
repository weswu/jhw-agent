<template>
  <Layout style="height:100%">
    <Header/>
    <Layout class="ivu-layout-has-sider main">
      <Sider></Sider>
      <router-view/>
    </Layout>
  </Layout>
</template>
<script>
import Sider from './sider'
import Header from './header'
export default {
  name: 'Main',
  components: {
    Sider,
    Header
  }
}
</script>
<style>
.main{
  height: calc(100vh - 50px);
  background: #ffffff;
}
</style>
