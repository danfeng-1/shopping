import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
// import router from '@/router'

// 引入路由组件
Vue.use(VueRouter)

// import Home from '@/views/Home'
// import Login from '@/views/Login'
// import Register from '@/views/Register'
// import Search from '@/views/Search'

//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
      originReplace.call(this,location,resolve,reject)
  }
  else{
      originReplace.call(this,location,()=>{},()=>{})
  }
}
// 配置路由
const router =  new VueRouter({
  routes,
  //设置滚动条的位置 vue-route的
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return {x:0, y: 0 };
    }
  // // 配置路由
  // routes: [
  //   {
  //     name:"home",
  //     path: "/home",
  //     component: Home,
  //     meta: {show:true}, // 路由原信息：定义的变量给Footer组件是否展示
      

  //   },
  //   {
  //     name: "search",
  //     path: "/search/:keyword?",
  //     component: Search,
  //     meta: {show:true},
  //     props: true // 可以路由传参，三种写法 就可以看到$attr
  //   },
  //   {
  //     name: "login",
  //     path: "/login",
  //     component: Login,
  //     meta: {show:false}
  //   },
  //   {
  //     name:"register",
  //     path: "/register",
  //     component: Register,
  //     meta: {show:false},
      
  //   },
  //   //重定向
  //   {
  //     path: '*',
  //     redirect: '/home', 
  //     component: Home,
  //     meta: {show:true}
  //   }
  // ]

})

export default router

// 全局守卫，前置首位（在路由跳转之前进行判断）
// to: 可以后取到你要跳转到那个路由信息，
// from: 可以获取到你从哪个路由来的信息
// next：放行函数 next()  next('/login')  next(false):中断调到from
router.beforeEach(async(to, from, next)=>{
  
  // 获取token
  // next();
  const nextRoute = ['detail','login','register','search','home']
  let token = store.state.user.token
  let name = store.state.user.nickName
  console.log('token',token)
  console.log(to)
  //用户登录
  if (token) {
    //用户登录了,不能去login，实际上，可以去注册，但是不能在此登陆
    if (to.path == "/login") {
        next('/home');
    } else {
        //用户登陆了,而且还有用户信息【去的并非是login】
        if (name) {
            next();
        } else {
            //用户登陆了,但是没有用户信息 
            try {
                //发请求获取用户信息以后在放行
                await store.dispatch('getUserInfo');
                next();
            } catch (error) {
                //用户没有信息，还携带token发请求获取用户信息【失败】
                //token【学生证失效了】
                //token失效:本地清空数据、服务器的token通知服务器清除
                await store.dispatch('logout');
                //回到登录页，重新获取一个新的学生证
                next('/login');
            }
        }
    }
  } else {
      //用户未登录,不能去交易和支付相关，和个人中心
      //用户未登录:不能进入/trade、/pay、/paysuccess、/center、/center/myorder  /center/teamorder
      let toPath = to.path;
      console.log('toPath',toPath)
      if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1 || toPath.indexOf('shopcart') != -1) {
        console.log('toPath.indexOf',toPath.indexOf)  
        next('/login?redirect='+toPath);
      } else {
          next();
      }
  }
  
  // if(token){ // 用户从前登陆过，不能再去login
  //   if(to.path == '/login'){ //  || '/register'
  //     next('/home') // /也会重定向到就是/home
  //   }else{ // 登陆了，但是去的是除去login以外的页面
  //     if(name){
  //       next() // 如果有用户名，直接放行
  //     }else{
  //       try{
  //         await store.dispatch('getUserInfo') // // 未登录,没有用户信息，派发action让仓库得到用户信息
  //         next()
  //       }catch(error){
  //         // token实效了，清空token,重新登陆
  //         await store.dispatch('logout')
  //         next('/login')
  //       }
  //     }
  //   }
  // }else{
  //   console.log(nextRoute.indexOf(to.name))
  //   // 没有token可以访问的页面
  //   if (nextRoute.indexOf(to.name) >= 0 ){ // 注意不要写成findIndex了
  //     next()
  //   }else{
  //     console.log('没有token不能访问私人页面！')
  //     console.log('---', to.path)
  //     // next('/login')
  //     next('/login?redirect='+to.path);
  //   }  
  // }
})


// router.beforeEach(async(to,from,next)=>{
//   let hasToken = store.state.user.token
//   let name = store.state.user.nickName
//   if(hasToken){
//       // 登陆，但是不能去login
//       if(to.path=='/login'||to.path=='/register'){
//           next('/home')
//       }else{
//           // 用户登陆，还有用户信息，
//           if(name){
//               next()
//           }else{
//               try {
//                   await store.dispatch('getUserInfo');
//                   next();
//               } catch (error) {
//                   await store.dispatch('logout');
//                   next('/login');
//               }
//           }
//       }
//   }else{
//       let toPath = to.path;
//       if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1 ||toPath.indexOf('shopcart') != -1) {
//           next('/login?redirect='+toPath);
//       } else {
//           next();
//       }
//   }
// })
