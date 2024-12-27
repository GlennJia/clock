<!-- 
 * @file defaultLayout.vue
 * @description 默认布局组件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
  <div class="defaultLayout">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'defaultLayout'
}
</script>

<style lang="scss" scoped>
.defaultLayout {
  width: 100%;
  height: 100%;
}
</style> 