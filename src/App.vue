<template>
  <div id="app">
    <Header></Header>
    <!-- <TypeNav></TypeNav> -->
    <router-view></router-view>
    <!-- 在Home Search中是显示的，在登录，注册是隐藏的 -->
    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search'"></Footer> -->
    <!-- <span>{{$route.meta.show}}</span> -->
    <Footer v-show="$route.meta.show"></Footer>


  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action 获取商品分类的三级列表的数据(App最先渲染，只有组件中.vue才可以放$store)
    this.$store.dispatch("getCategoryList")
  }
}
</script>

<style scoped lang="less">

</style>
