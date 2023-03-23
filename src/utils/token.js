// 对外暴露一个函数
export const setToken = (token)=> {
  //以后开发的时候:经常的登录的成功获取token【持久化存储】
  localStorage.setItem('TOKEN', token);
}

export const getToken = () => {
  return localStorage.getItem("TOKEN");
}

export const removeToken=()=>{
  localStorage.removeItem('TOKEN')
}