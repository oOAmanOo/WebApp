const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/',
  configureWebpack: {
    resolve: {
      fallback: {
        "crypto": require.resolve("crypto-browserify")
      }
    }
  }
})
