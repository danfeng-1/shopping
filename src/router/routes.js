//引入相应的路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'

import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
//个人中心的二级路由组件
import TeamOrder from '@/views//Center/TeamOrder'
import MyOrder from '@/views/Center/MyOrder'
export default [
    {
        path: '/home',
        name: 'home',
        component: Home,
        //路由元信息,新学习的一个配置项!!!!给当前路由添加一些额外数据
        //它的右侧是一个对象[可以有多个键值对]
        //路由配置项：书写的时候不要胡写、乱写、瞎写【在VC组件身上获取不到,没有任何意义】
        meta: { show: true },
    }
    ,
    {
        
        //在注册路由的时候,如果这里占位，切记务必要传递params
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        //命名路由,给路由起一个名字
        name: 'search',
        //新增配置项:props,给路由组件传递props参数
        //第一种布尔模式,相当于把params参数，作为props属性值传递给这个路由组件
        // props:true,

        //第二种:对象形式
        // props:{a:1,b:'我爱你'}

        //第三种写法:函数写法.一般是把query参数与params参数当中props传递给路由组件!!!
        //route就是当前路由
        // props:(route)=>{
        //      //是将当前箭头函数返回结果，作为props传递给search路由组件!!!
        //      return {a:route.params.keyword,b:'可以传递参数'};
        // }
    }
    ,
    {
        path: '/login',
        component: Login,
        meta: { show: false },
        name: 'login'
    }
    ,
    {
        path: '/register',
        component: Register,
        meta: { show: false },
        name: 'register'
    }
    ,
    {
        path: '/detail/:skuId?',
        component: Detail,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
        name:'detail'
    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: true },
        name:'addcartsuccess'
    }
    ,
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true },
        name: 'shopcart'
    },
    
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        name: 'trade',
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 交易(订单)页面必须从购物车而来
            if (from.path == "/shopcart"){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/pay', //:orderId?
        component: Pay,
        meta: { show: true },
        name: 'pay',
        beforeEnter: (to,from,next) => {
            if(from.path == 'trade'){
                next(); //如果是来自交易页面(订单)，才可以进行支付
            }else{
                next(false)
            }
        }
        
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true },
        
    }
    ,
    {   
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由配置的地方
        children:[
             //我的订单
             {
                  path:'myorder',
                  component:MyOrder,
                  name: 'myorder'
             }
             ,
             {
                 path:'teamorder',
                 component:TeamOrder,
                 name: 'teamorder'
             }
             ,
             {
                 path:'/center',
                 redirect:'/center/myorder',
                 name: 'center'
             }
        ]
    },
    // 剩余的重定向到首页（404）？
    {
        path: '*',
        redirect: '/home',
        name: 'home'
    }
    // {
    //     path: '/communication',
    //     component: () => import('@/pages/Communication/Communication'),
    //     children: [
    //       {
    //         path: 'event',
    //         component: () => import('@/pages/Communication/EventTest/EventTest'),
    //         meta: {
    //          show: false
    //         },
    //       },
    //       {
    //         path: 'model',
    //         component: () => import('@/pages/Communication/ModelTest/ModelTest'),
    //         meta: {
    //             show: false
    //         },
    //       },
    //       {
    //         path: 'sync',
    //         component: () => import('@/pages/Communication/SyncTest/SyncTest'),
    //         meta: {
    //             show: false
    //         },
    //       },
    //       {
    //         path: 'attrs-listeners',
    //         component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
    //         meta: {
    //             show: false
    //         },
    //       },
    //       {
    //         path: 'children-parent',
    //         component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
    //         meta: {
    //             show: false
    //         },
    //       },
    //       {
    //         path: 'scope-slot',
    //         component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
    //         meta: {
    //             show: false
    //         },
    //       }
    //     ],
    //   },
]