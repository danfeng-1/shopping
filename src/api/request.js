//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式,通过start可以开始
import "nprogress/nprogress.css";
import store from '@/store'
//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
  //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
  baseURL: "/api",
  //超时的设置
  timeout: 5000
});

requests.interceptors.request.use((config)=>{
  //请求拦截器:请求头【header】,请求头能否给服务器携带参数
  //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
  //进度条开始
  nprogress.start();


  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // if (store.state.shopcart.USER_ID) {
  //   console.log(store.state.shopcart.USER_ID)
  //   config.headers.userTempId = store.state.shopcart.USER_ID;
  // }

  //token[公共参数]
  // 把token带上（除了第一次）以便让服务器认出你是谁发送对应的数据
  if(store.state.user.token){
      config.headers.token = store.state.user.token;
  }

  //每一次发请求,请求头携带用户临时身份
  // config.headers.userTempId = SET_USERID();
  //不管那个模块发请求,请求拦截器，都可以触发。请求拦截器可以通过请求头每一次协大公共参数给服务器【用户未登录的临时身份】
  return config;

})

requests.interceptors.response.use((res)=>{
  // 成功的回调函数
  return res.data

},(err)=>{
  // 相应失败的回调函数
  return Promise.reject(new Error("failed"))
})

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;