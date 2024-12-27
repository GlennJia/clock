<!-- 
 * @file animatedBackground.vue
 * @description 动态渐变背景组件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
  <div 
    class="animated-background" 
    :class="{ 
      active: isActive,
      'is-loop': loop,
      [colorScheme]: true 
    }"
  ></div>
</template>

<script>
export default {
  name: 'AnimatedBackground',
  props: {
    isActive: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    colorScheme: {
      type: String,
      default: 'default',
      validator: value => ['default', 'clock', 'welcome'].includes(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  // 默认配色（切换时使用）
  &.default {
    background: linear-gradient(
      45deg,
      #667eea,
      #764ba2,
      #6B8DD6,
      #8E37D7,
      #4A00E0,
      #8E2DE2
    );
    background-size: 400% 400%;
  }

  // 时钟页面配色
  &.clock {
    background: linear-gradient(
      45deg,
      #2c3e50,
      #3498db,
      #2980b9,
      #34495e,
      #2c3e50,
      #3498db
    );
    background-size: 400% 400%;
  }

  // 欢迎页面配色
  &.welcome {
    background: linear-gradient(
      45deg,
      #ee7752,
      #e73c7e,
      #23a6d5,
      #23d5ab,
      #ee7752,
      #e73c7e
    );
    background-size: 400% 400%;
  }

  // 循环动画
  &.is-loop {
    animation: gradientBG 15s ease infinite !important;
  }

  // 单次过渡动画
  &:not(.is-loop).active {
    animation: transitionGradient 1.5s ease !important;
  }
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes transitionGradient {
  0% {
    background-position: 0% 50%;
    opacity: 0;
  }
  20% {
    opacity: 1;
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
    opacity: 0;
  }
}
</style> 