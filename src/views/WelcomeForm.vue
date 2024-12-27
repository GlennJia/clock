<!--
 * @file welcomeForm.vue
 * @description 登录注册页面
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
  <div class="login-container">
    <AnimatedBackground 
      color-scheme="welcome" 
      :loop="true"
    />
    <!-- 左侧装饰内容，仅在大屏幕显示 -->
    <div class="decoration-section">
      <div class="decoration-content">
        <div class="brand">
          <h1>Vue Clock</h1>
          <p class="slogan">优雅的时间管理方式</p>
        </div>
        <div class="features">
          <div class="feature-item">
            <div class="feature-icon">⏰</div>
            <h3>精确计时</h3>
            <p>高精度时间显示，毫秒级同步</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🌈</div>
            <h3>优雅设计</h3>
            <p>现代化UI设计，流畅的动画效果</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h3>安全可靠</h3>
            <p>安全的用户认证，数据加密存储</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单 -->
    <div class="form-section">
      <div class="form-box" :class="{ 'register-mode': !isLogin }">
        <div class="toggle-container">
          <div class="toggle-slide" :class="{ 'slide-right': !isLogin }"></div>
          <button 
            class="toggle-btn" 
            :class="{ 'active': isLogin }"
            @click="isLogin = true"
          >登录</button>
          <button 
            class="toggle-btn" 
            :class="{ 'active': !isLogin }"
            @click="isLogin = false"
          >注册</button>
        </div>

        <form @submit.prevent="handleSubmit" class="form-content">
          <div class="input-group">
            <input 
              v-model="form.username" 
              type="text" 
              placeholder="用户名"
              required
            >
          </div>
          
          <div class="input-group">
            <input 
              v-model="form.password" 
              type="password" 
              placeholder="密码"
              required
            >
          </div>

          <transition name="fade-slide">
            <div v-if="!isLogin" class="input-group">
              <input 
                v-model="form.confirmPassword" 
                type="password" 
                placeholder="确认密码"
                required
              >
            </div>
          </transition>

          <button type="submit" class="submit-btn">
            {{ isLogin ? '登录' : '注册' }}
          </button>
        </form>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showError" class="error-popup" @click="hideError">
        <div class="error-content" @click.stop>
          <div class="error-icon">!</div>
          <div class="error-message">{{ errorMessage }}</div>
          <button class="error-close" @click="hideError">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AnimatedBackground from '@/components/common/AnimatedBackground.vue'

export default {
  name: 'WelcomeForm',
  components: {
    AnimatedBackground
  },

  data() {
    return {
      /** @property {boolean} isLogin - 当前是否为登录模式 */
      isLogin: true,
      /** @property {Object} form - 表单数据对象 */
      form: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      /** @property {boolean} showError - 控制错误弹窗显示 */
      showError: false,
      /** @property {string} errorMessage - 错误信息内容 */
      errorMessage: ''
    }
  },

  methods: {
    /**
     * @method handleSubmit
     * @description 处理表单提交，包括登录和注册逻辑
     * @async
     */
    async handleSubmit() {
      // TIP: 在注册模式下验证密码一致性
      if (!this.isLogin && this.form.password !== this.form.confirmPassword) {
        this.showErrorMessage('两次输入的密码不一致')
        return
      }

      try {
        // TIP: 模拟API调用，实际项目中替换为真实接口
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!this.isLogin && this.form.username === 'admin') {
              reject(new Error('用户名已存在'))
            }
            resolve()
          }, 1000)
        })
        
        if (this.isLogin) {
          const userInfo = {
            username: this.form.username,
            loginTime: new Date().toISOString(),
          }
          // TIP: 使用 sessionStorage 确保会话级别的持久化
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$parent.$parent.isLoggedIn = true
        } else {
          this.showErrorMessage('注册成功！请登录')
          this.isLogin = true
          this.form.confirmPassword = ''
        }
      } catch (error) {
        this.showErrorMessage(error.message || '操作失败，请重试')
      }
    },

    /**
     * @method showErrorMessage
     * @description 显示错误提示弹窗
     * @param {string} message - 错误信息
     */
    showErrorMessage(message) {
      this.errorMessage = message
      this.showError = true
    },

    hideError() {
      this.showError = false
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-container {
  position: relative;
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

.animated-background {
  position: absolute;
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
  animation: gradientBG 15s ease infinite alternate;
  z-index: -1;
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

.decoration-section {
  flex: 1;
  display: none;
  color: white;
  padding: 4rem;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.decoration-content {
  max-width: 600px;
}

.brand {
  margin-bottom: 4rem;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    letter-spacing: 0.1em;
  }

  .slogan {
    font-size: 1.5rem;
    opacity: 0.9;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: $border-radius-lg;
  backdrop-filter: blur(10px);
  transition: $transition-normal;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.5;
  }
}

.form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  backdrop-filter: blur(10px);
  
  @media (min-width: 1024px) {
    background: rgba(255, 255, 255, 0.05);
  }
}

.form-box {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-normal;

  @media (min-width: 1024px) {
    transform: translateX(-50px);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
}

.toggle-container {
  position: relative;
  display: flex;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  margin-bottom: 2rem;
  padding: 4px;
}

.toggle-slide {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: white;
  border-radius: 25px;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.toggle-slide.slide-right {
  transform: translateX(100%);
}

.toggle-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: none;
  color: #666;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.toggle-btn.active {
  color: #667eea;
  font-weight: 600;
}

.form-content {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.input-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: $font-family-base;
  letter-spacing: 0.02em;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: $font-family-base;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* 过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 480px) {
  .form-box {
    margin: 1rem;
    padding: 1.5rem;
  }
}

.error-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.error-content {
  background: white;
  padding: 2rem;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-normal;
  max-width: 90%;
  width: 400px;
  text-align: center;
  animation: popup 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.error-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #ff4757;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 auto 1rem;
}

.error-message {
  color: $text-primary;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.error-close {
  padding: 0.8rem 2rem;
  background: $primary-gradient;
  color: white;
  border: none;
  border-radius: $border-radius-md;
  font-size: 1rem;
  cursor: pointer;
  transition: $transition-normal;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-light;
  }
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 添加响应式动画 */
@media (min-width: 1024px) {
  .feature-item {
    opacity: 0;
    animation: fadeInUp 0.6s forwards;

    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.2}s;
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 