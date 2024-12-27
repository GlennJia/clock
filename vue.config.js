/**
 * @file vue.config.js
 * @description Vue CLI 配置文件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
 */

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // 部署应用包的基本URL
  publicPath: './',  // 使用相对路径，确保打包后可以在任何路径下运行

  // 打包输出目录
  outputDir: 'dist',

  // 静态资源目录
  assetsDir: 'static',

  // 生产环境的 source map
  productionSourceMap: false,  // 关闭 source map，减小打包体积

  // CSS 相关配置
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    extract: true,
    // 开启 CSS source maps
    sourceMap: false,
    // CSS 预处理器配置
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/themes.scss";
        `
      }
    }
  },

  // webpack 配置
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        automaticNameDelimiter: '~',
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          common: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    performance: {
      hints: false  // 关闭性能提示
    }
  },

  // 开发服务器配置
  devServer: {
    port: 8080,
    open: true,
    https: false,
    host: 'localhost'
  }
})
