//购物车小仓库
import { reqShopCart, reqUpdateChecked, reqDeleteCart } from '@/api'

//规范:利用vuex存储数据
import { SET_USERID } from '@/utils/USER_ID';
let state = {
     //vuex仓库存储用户临时身份,vuex存储数据确实非持久化的，SET_USERID执行返回结果,可是本地存储获取的！！
     USER_ID: SET_USERID(),
     shopCartInfo: []
};
let mutations = {
     GETSHOPCART(state, payload) {
          state.shopCartInfo = payload;
     }
};
let actions = {
  //获取用户购物车的数据
  async getShopCart({ commit, state, dispatch }) {
    let result = await reqShopCart();
    console.log('拿到了用户购物车数据',result)
    if (result.code == 200) {
        commit('GETSHOPCART', result.data);
    }
  },
  //修改某一个商品勾选状态
  async changeChecked({ commit, state, dispatch }, { skuId, isChecked }) {
    let result = await reqUpdateChecked(skuId, isChecked);
    if (result.code == 200) {
         return 'ok';
    } else {
         return Promise.reject();
    }

  },
  //修改全部商品的勾选的状态，对数据进行操作后再发送请求
  allUpdateChecked({ commit, state, dispatch }, isChecked) {
    let arr = [];
    //获取购物车商品的个数,进行遍历
    state.shopCartInfo[0].cartInfoList.forEach(item => {
         //调用修改某一个商品的action【四次】
         let ps = dispatch("changeChecked", { skuId: item.skuId, isChecked });
         arr.push(ps);
    })
    //Promise.all():参数需要的是一个数组【数组里面需要promise】
    //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
    //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
    return Promise.all(arr);
  },
  //删除某一个商品的数据
  async deleteCartById({ commit, state, dispatch }, skuId) {
    let result = await reqDeleteCart(skuId);
    if (result.code == 200) {
         return 'ok';
    } else {
         return Promise.reject();
    }
  },
  //删除选中的所有商品
  deleteAllCart({ dispatch,getters }) {
    let PromiseAll = [];
    //获取仓库里面购物车的所有的数据
    console.log('---------',getters.CartInfo)
    getters.CartInfo.cartInfoList.forEach(item => {
      //商品的勾选状态是勾选的,发请求一个一个删除
      let promise = item.isChecked === 1 ? dispatch('deleteCartById',item.skuId):[]
      // 将每一次返回的Promise添加到数组中
      PromiseAll.push(promise)
    })
    // 只要全部的p1|p2...都成功，返回结果即为成功
    // 如果有一个失败，返回即为失败结果（注意all和race）
    return Promise.all(PromiseAll);
  }


}
let getters = {
  //计算数组里面第一个元素：对象
  CartInfo(state) {
    return state.shopCartInfo[0] || {};
  },
}

//对外暴露
export default {
  state,
  mutations,
  actions,
  getters
}