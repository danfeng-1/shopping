<template>
  <!-- <h1>HOME</h1> -->
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- <Floor></Floor> -->
    <Floor 
    v-for="floor in floorList" 
    :key="floor.id"
    :list="floor"
    >
    </Floor>
    <Brand></Brand>

    
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Brand from './Brand'
import Like from './Like'
import Rank from './Rank'
import Recommend from './Recommend'
import Floor from './Floor'
import { mapState } from 'vuex'
export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    this.$store.dispatch('getFloorList') // getFloorList是获取数据
    // 获取用户信息首页展示,
    // this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList: state=>state.home.floorList
    })
  }
  
  

}
</script>

<style>

</style>