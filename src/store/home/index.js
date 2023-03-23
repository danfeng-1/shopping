import { reqBannerList, reqCategoryList ,reqFloorList} from "@/api";

// home模块的小仓库

const state = {
  //商品分类的数据,仓库里面数据起始数值不要瞎写【服务器返回的是啥】
  category: [],
  bannerList: [],
  floorList: []
};
const mutations = {
  GETCATEGORY(state, category) {
    state.category = category;
  },
  GETBANNER(state, banner) {
    state.bannerList = banner
  },
  GETFLOOR(state, floor) {
    // console.log(floor);
    state.floorList = floor
  }
}
const actions = {
  // 通过api里面的接口函数调用，想服务器发请求没获取服务器的数据
  async getCategoryList({commit, state, dispatch}){ // 或者传入的上下文对象和数据
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code === 200) {
      return commit('GETCATEGORY', result.data) // 存储数据
    }
  },
  async getBannerList(context) {
    let result = await reqBannerList() // 需要请求到数据再进行commit传进去
    // console.log(result)
    if(result.code === 200){
      return context.commit('GETBANNER',result.data)
    }
  },
  async getFloorList(context) {
    let result = await reqFloorList() // 需要请求到数据再进行commit传进去
    if(result.code === 200){
      return context.commit('GETFLOOR',result.data)
    }
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}