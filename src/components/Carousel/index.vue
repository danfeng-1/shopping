<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <!-- 轮播图 -->
      <div class="swiper-slide" 
        v-for="item in list" 
        :key="item.id" 
        >
          <img :src="item.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    // 不放在mounted中的原因是想要拆分组件
    list: {
      // 首先因为数据都是从父组件获取来的，不会变，所以监听事件就设置一上来就监听
      immediate: true,
      handler(){
        // 可以放在这里，通过监听的方式
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            //设置轮播图防线
            
            //开启循环模式
            loop: true,
            // 如果需要分页器
            pagination: {
                el: ".swiper-pagination",
                //分页器类型
                // type: "bullets",
                //点击分页器，切换轮播
                clickable: true,
            },
            // //自动轮播
            autoplay: {
                delay: 1000,
                //新版本的写法：目前是5版本
                // pauseOnMouseEnter: true,
                //如果设置为true，当切换到最后一个slide时停止自动切换
                stopOnLastSlide: true,
                //用户操作swiper之后，是否禁止autoplay
                disableOnInteraction: false,
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
          })
        mySwiper.el.onmouseover = function () {
            mySwiper.autoplay.stop();
        };
        //鼠标离开开始轮播
        mySwiper.el.onmouseout = function () {
            mySwiper.autoplay.start();
        };
        })
      }
        
    }
  }

}
</script>

<style scoped lang="less">

</style>