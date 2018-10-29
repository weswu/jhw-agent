<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    document.body.removeChild(document.getElementById('app-loading'))
  }
}
</script>

<style>
</style>
