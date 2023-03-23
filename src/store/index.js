import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//对外暴露仓库
//第一个注意:需要关键字new，你没有new会报错的
//第二个注意:Store构造函数,书写的时候别小写

//引入小仓库
import home from './home';
import search from './search';
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade';
export default new Vuex.Store({
  
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }


})