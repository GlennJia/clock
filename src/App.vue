<!-- 
 * @file App.vue
 * @description 应用程序根组件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
  <div id="app">
    <AnimatedBackground 
      :is-active="isTransitioning" 
      color-scheme="default"
    />
    <DefaultLayout>
      <transition name="page" mode="out-in" @enter="onEnter" @leave="onLeave">
        <Index v-if="isLoggedIn" key="index" />
        <WelcomeForm v-else key="welcome" msg="欢迎使用 Vue.js 表单" />
      </transition>
    </DefaultLayout>
  </div>
</template>

<script>
/**
 * @component App
 * @description 根组件，管理全局状态和页面切换
 */
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import WelcomeForm from '@/views/WelcomeForm.vue'
import Index from '@/views/Index.vue'
import AnimatedBackground from '@/components/common/AnimatedBackground.vue'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    WelcomeForm,
    Index,
    AnimatedBackground
  },
  
  data() {
    return {
      /** @property {boolean} isLoggedIn - 用户登录状态 */
      isLoggedIn: false,
      isTransitioning: false
    }
  },

  created() {
    // TIP: 页面加载时检查登录状态，确保会话持久化
    const userInfo = sessionStorage.getItem('userInfo')
    this.isLoggedIn = !!userInfo
  },

  methods: {
    onEnter() {
      this.isTransitioning = true
      setTimeout(() => {
        this.isTransitioning = false
      }, 1500) // 动画持续1.5秒
    },
    onLeave() {
      this.isTransitioning = true
    }
  },

  watch: {
    /**
     * @watch isLoggedIn
     * @description 监听登录状态变化，自动清理会话存储
     */
    isLoggedIn(newValue) {
      if (!newValue) {
        sessionStorage.removeItem('userInfo')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/global.scss';

#app {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
}

.transition-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  opacity: 0;
  pointer-events: none;
  z-index: 100;
  transition: opacity 0.3s ease;

  &.active {
    opacity: 1;
    animation: transitionGradient 1.5s ease;
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

/* 页面过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  height: 100%;
}

.page-enter {
  opacity: 0;
  transform: scale(1.1);
}

.page-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 确保过渡期间内容不会重叠 */
.page-enter-active {
  position: absolute;
  width: 100%;
}

/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: $font-family-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style>
.transition-background.active {
  opacity: 1;
  animation: transitionGradient 1.5s ease forwards;
}
</style>
