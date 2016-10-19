<template>
  <div id="app">
    <vux></vux>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import Vux from './components/Vux'
import BottomBar from './components/BottomBar.vue'

export default {
  name: 'app',
  components: {
    Vux,BottomBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
