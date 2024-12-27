/**
 * @file main.js
 * @description 应用程序入口文件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
 */

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
