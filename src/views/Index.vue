<!-- 
 * @file index.vue
 * @description 时钟主页面
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
  <div class="index-page">
    <AnimatedBackground 
      color-scheme="clock" 
      :loop="true"
    />
    <FlipClock />
    <button class="logout-btn" @click="handleLogout">
      <span class="logout-text">退出登录</span>
    </button>
  </div>
</template>

<script>
import AnimatedBackground from '@/components/common/AnimatedBackground.vue'
import FlipClock from '@/components/FlipClock.vue'

export default {
  name: 'IndexPage',
  components: {
    AnimatedBackground,
    FlipClock
  },
  methods: {
    handleLogout() {
      sessionStorage.removeItem('userInfo')
      this.$parent.$parent.isLoggedIn = false
    }
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logout-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .logout-text {
    color: white;
    font-size: 16px;
  }
}
</style> 