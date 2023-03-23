<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
        <div class="container">
            <div class="loginList">
                <p>欢迎您的到来！</p>
                <!-- 如果没有登录 -->
                <p v-if="!$store.state.user.nickName">
                    <span>请</span>
                    <!-- <a href="###">登录</a> -->
                    <router-link to="/login">登录</router-link>
                    <!-- <a href="###" class="register">免费注册</a> -->
                    <router-link class="register" to="/register">免费注册</router-link>
                </p>
                <p v-else>
                    <a>{{$store.state.user.nickName}}</a>
                    <a class="register" @click="logout">退出登录</a>
                </p>
            </div>
            <div class="typeList">

                <!-- <a @click="$router.push('/trade')">我的订单</a>
                <a @click="$router.push('/shopcart')">我的购物车</a> -->
                <router-link to="/trade">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                <router-link to="/center/myorder">个人中心</router-link>
            </div>
        </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
        <h1 class="logoArea">
            <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                <img src="./images/logo.png" alt="">
            </a> -->
            <router-link class="logo" to="/home">
                <img src="./images/logo.png" alt="">
            </router-link>
        </h1>
        <div class="searchArea">
            <form action="###" class="searchForm">
                <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
            </form>
        </div>
    </div>
</header>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goSearch() {
            // 搜索按钮回调函数，需要向search路由进行跳转
            // this.$router.push("/search/")
            // 路由传递信息
            // 第一种：字符串形式
            // this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase())
            // 第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            // 第三种：对象,给路由器一个名字name
            // this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})
            // 如何指定params参数可穿可不穿，
            // this.$router.push({name:"search",params:{keyword:''||undefined}, query:{k:this.keyword.toUpperCase}})
            
            // hearder组件在路由跳转的时候只带params参数
            // this.$router.push({
            //     name: "search",
            //     params: {keyword:this.keyword || undefined }
            // })

            // this.$router.push({
            //     name: "search",
            //     params: { keyword: this.keyword || undefined },
            //     query: { big: this.keyword.toUpperCase() }
            // })

            if (this.$route.query){
                // 代表的是如果有query参数也daiguoq
                let locations = {
                    name: "search",
                    params: { keyword: this.keyword || undefined },
                };
                locations.query = this.$route.query;
                this.$router.push(locations);
            }
        },
        //退出登录的按钮的回调
        logout(){
            //派遣action退出登录
            // console.log('logout---',this.$store.state.user.nickName)
            try {
                // 如果退出成功
                this.$store.dispatch('logout');
                // 回到首页
                this.$router.push('/home')
            }catch(error){

            }
        }
    },
    mounted(){
        // 通过全局事件总线清除关键字
        this.$bus.$on('clear',()=>{
            this.keyword = ''
        })
    },



}
</script>

<style scoped lang="less">
.header {
  &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
          width: 1200px;
          margin: 0 auto;
          overflow: hidden;

          .loginList {
              float: left;

              p {
                  float: left;
                  margin-right: 10px;

                  .register {
                      border-left: 1px solid #b3aeae;
                      padding: 0 5px;
                      margin-left: 5px;
                  }
              }
          }

          .typeList {
              float: right;

              a {
                  padding: 0 10px;

                  &+a {
                      border-left: 1px solid #b3aeae;
                  }
              }

          }

      }
  }

  &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
          float: left;

          .logo {
              img {
                  width: 120px;
                  margin: 10px 10px;
              }
          }
      }

      .searchArea {
          float: right;
          margin-top: 35px;

          .searchForm {
              overflow: hidden;

              input {
                  box-sizing: border-box;
                  width: 490px;
                  height: 32px;
                  padding: 0px 4px;
                  border: 2px solid #ea4a36;
                  float: left;

                  &:focus {
                      outline: none;
                  }
              }

              button {
                  height: 32px;
                  width: 68px;
                  background-color: #ea4a36;
                  border: none;
                  color: #fff;
                  float: left;
                  cursor: pointer;

                  &:focus {
                      outline: none;
                  }
              }
          }
      }
  }
}
</style>