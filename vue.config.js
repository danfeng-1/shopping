const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  produceSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验工具
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: ' http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api': ''}
      }
    }
  }
})
