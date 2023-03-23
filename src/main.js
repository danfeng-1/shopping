import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true


// 引入路由
import router from '@/router'
//注册仓库功能
import store from './store';

// 三级联动组件  --全局组件
import TypeNav from '@/components/TypeNav'
// 注册全局组件
Vue.component('TypeNav',TypeNav)

// 三级联动组件  --全局组件
import Carousel from '@/components/Carousel'
// 注册全局组件
Vue.component(Carousel.name,Carousel)


// 测试跨域请求是否能够成功
// import { reqCategory } from '@/api'
// reqCategory()

//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
// 要使用swiper还需要引入他的css文件和js文件
import 'swiper/css/swiper.css'
import 'swiper/js/swiper'

/*
底下的写法目前是全部引入
完整引入element-ui组件库,可以使用任意UI组件【都是全局组件】
//引入elementUI插件
import ElementUI from 'element-ui';
//引入element样式
//安装使用elementUI插件
Vue.use(ElementUI);
*/
//按需引入
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Row, Col, MessageBox,Message,Input} from 'element-ui';
//element-ui大多数组件，注册为全局组件Vue.component|Vue.use
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input)
//按需引入写法不同的:MessageBox、Message、Loading、Notification
Vue.prototype.$msgbox = MessageBox;
//消息提示框
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$message = Message;

// 导入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'
import kun from '@/assets/kun.png'
Vue.use(VueLazyLoad,{
  // 懒加载默认的图片
  loading: kun // 在search组件中把:src换成v-lazy即可
})

// 引入表单校验插件
import '@/plugins/validate'

// 为了让API里面的所有接口不至于每个页面反复去调用，直接在main.js中引入，
// 和$bus一样注册好
import * as API from '@/api'
new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API

  },
  //下面代码作用:给项目添加路由功能,给全部VC实例身上拥有两个属性,$router|$route
  router,
  //下面的代码作用:给项目添加仓库功能,主要的作用是给全部VC拥有一个$store属性
  store,
}).$mount('#app')
