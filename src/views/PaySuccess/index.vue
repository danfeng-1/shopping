<template>
  <div class="paysuccess">

    <div class="success">
      <h3>
        <img src="./images/right.png" width="48" height="48">
        恭喜您，支付成功啦！
      </h3>
      <div class="paydetail">
        <p class="button">
          <router-link class="btn-look" to="/center">查看订单</router-link>
          <router-link class="btn-goshop" to="/">继续购物</router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    // 组件内守卫,不能获取组件实例this，因为在守卫执行前，组件实例还未创建
    // beforeRouteEnter(to,from,next){
    //   if(from.path=='pay'){
    //     next()
    //   }else{
    //     next(false)
    //   }
    // },

    // beforeRouteUpdate(to,from,next){
      // 在当前组件改变的时候，被复用时调用,例如带有动态参数的路径/fool/1和/fool/2之间跳转，
    // 因为会渲染同样的fool组件，银子组件实例会被复用，而这个钩子就会在这种情况下被调用，可以访问组件实例this
    //   console.log(this)
    // },

    // 导航离开该组件的对应路由时调用，可以访问组件实例this
    // beforeRouteLeave(to, from,next){
    //   next()
    // }
  }
</script>

<style lang="less" scoped>
  .paysuccess {
    margin: 20px auto;
    padding: 25px;
    border: 1px solid rgb(211, 211, 211);
    width: 1200px;
    width: 1148px;

    .success {
      width: 500px;
      margin: 0 auto;

      h3 {
        margin: 20px 0;
        font-weight: 700;
        font-size: 20px;
        line-height: 30px;

        img {
          max-width: 100%;
          vertical-align: middle;
          border: 0;
          margin-right: 14px;
        }
      }

      .paydetail {
        margin-left: 66px;
        font-size: 15px;

        .button {
          margin: 30px 0;
          line-height: 26px;

          a {
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            border-radius: 2px;
            user-select: none;
            font-size: 18px;
            padding: 4px 20px;
            line-height: 22px;
            text-decoration: none;

            &.btn-look {
              margin-right: 13px;
              color: #fff;
              background-color: #e1251b;
              border: 1px solid #e1251b;
            }

            &.btn-goshop {
              color: #666;
              background-color: #eee;
              border: 1px solid #e1e1e1;
            }
          }
        }
      }
    }
  }
</style>