
//search模块的小仓库
import { reqSearchList } from '@/api'

const state = {
  searchList: {}
};

const mutations = {
  GETSEARCHLIST(state, searchList){
    state.searchList = searchList
    // console.log('state.searchList',state.searchList)
  }
};

const actions = {
  async getSearchList(context, searchParams={}) { // 必须至少是空对象
    let result = await reqSearchList(searchParams);
    // console.log('result',result)
      if (result.code === 200) {
        return context.commit('GETSEARCHLIST', result.data);
      }
  },
}

const getters = {
  //计算新的属性:state,当前小仓库的数据
  goodsList(state) {
    return state.searchList.goodsList;
  },
  //品牌的数据
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  //商品属性
  attrsList(state) {
    return state.searchList.attrsList;
}


}

export default {
  state,
  mutations,
  actions,
  getters
}