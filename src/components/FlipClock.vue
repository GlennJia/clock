<!--
 * @file flipClock.vue
 * @description 翻页时钟组件
 * @author glennjia <glennjia@qq.com>
 * @created 2024-03
-->

<template>
    <div class="clock-wrapper">
        <div class="clock-container" :class="currentTheme">
            <div class="clock-card">
                <!-- 时间部分 -->
                <div class="time-section">
                    <div class="time-block">
                        <div class="time-card">{{ hours }}</div>
                        <div class="time-label">时</div>
                    </div>
                    <div class="time-divider">:</div>
                    <div class="time-block">
                        <div class="time-card">{{ minutes }}</div>
                        <div class="time-label">分</div>
                    </div>
                    <div class="time-divider">:</div>
                    <div class="time-block">
                        <div class="time-card">{{ seconds }}</div>
                        <div class="time-label">秒</div>
                    </div>
                </div>
                <!-- 日期部分 -->
                <div class="date-section">
                    {{ fullDate }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * @component FlipClock
 * @description 显示实时时间的翻页时钟组件
 */
export default {
    name: 'FlipClock',

    data() {
        return {
            /** @property {string} hours - 当前小时 */
            hours: '00',
            /** @property {string} minutes - 当前分钟 */
            minutes: '00',
            /** @property {string} seconds - 当前秒数 */
            seconds: '00',
            /** @property {string} fullDate - 完整日期文本 */
            fullDate: '',
            currentTheme: 'theme-light' // 或 '' 为默认深色主题
        }
    },

    created() {
        // TIP: 立即更新时间并启动定时器
        this.updateTime()
        this.timer = setInterval(this.updateTime, 1000)
    },

    beforeDestroy() {
        // TIP: 组件销毁时清理定时器，防止内存泄漏
        if (this.timer) {
            clearInterval(this.timer)
        }
    },

    methods: {
        /**
         * @method updateTime
         * @description 更新当前时间显示
         */
        updateTime() {
            const now = new Date()
            this.hours = String(now.getHours()).padStart(2, '0')
            this.minutes = String(now.getMinutes()).padStart(2, '0')
            this.seconds = String(now.getSeconds()).padStart(2, '0')
            this.fullDate = now.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.clock-wrapper {
  // 直接在 clock-wrapper 下定义变量，而不是在 :root 中
  // 基础主题 (默认深色主题)
  --clock-background: rgba(255, 255, 255, 0.05);
  --clock-backdrop-blur: 20px;
  --clock-padding: 3.5rem 4rem;
  --clock-border-radius: 30px;
  --clock-border: 1px solid rgba(255, 255, 255, 0.1);
  --clock-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);

  // 时间卡片
  --time-card-background: linear-gradient(180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 100%);
  --time-card-padding: 2rem 1.5rem;
  --time-card-border-radius: 20px;
  --time-card-color: #fff;
  --time-card-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  --time-card-text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);

  // 时间标签
  --time-label-background: rgba(255, 255, 255, 0.1);
  --time-label-color: rgba(255, 255, 255, 0.85);
  --time-label-border: 1px solid rgba(255, 255, 255, 0.1);
  --time-label-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  --time-label-padding: 0.4rem 1rem;
  --time-label-border-radius: 12px;

  // 分隔符
  --divider-color: rgba(255, 255, 255, 0.8);
  --divider-font-size: 3.5rem;

  // 日期部分
  --date-color: rgba(255, 255, 255, 0.9);
  --date-border-color: rgba(255, 255, 255, 0.1);
  --date-gradient: linear-gradient(90deg,
          transparent,
          rgba(255, 255, 255, 0.2),
          transparent);
  --date-font-size: 1.8rem;

  // 字体大小
  --time-font-size: 4.5rem;
  --label-font-size: 1rem;

  // 动画时间
  --transition-normal: 0.3s ease;

  // 浅色主题
  &.theme-light {
    --clock-background: rgba(0, 0, 0, 0.05);
    --time-card-background: linear-gradient(180deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.05) 100%);
    --time-card-color: #333;
    --time-card-text-shadow: none;
    --time-label-color: rgba(0, 0, 0, 0.85);
    --time-label-background: rgba(0, 0, 0, 0.1);
    --time-label-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    --divider-color: rgba(0, 0, 0, 0.8);
    --date-color: rgba(0, 0, 0, 0.9);
    --date-border-color: rgba(0, 0, 0, 0.1);
    --date-gradient: linear-gradient(90deg,
            transparent,
            rgba(0, 0, 0, 0.2),
            transparent);
  }

  .clock-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
  }

  .clock-card {
    background: var(--clock-background);
    backdrop-filter: blur(var(--clock-backdrop-blur));
    padding: var(--clock-padding);
    border-radius: var(--clock-border-radius);
    box-shadow: var(--clock-shadow);
    border: var(--clock-border);
    transform: translateY(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.3);
    }
  }

  .time-section {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2.5rem;
    padding: 0.5rem;
  }

  .time-block {
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
  }

  .time-card {
    background: var(--time-card-background);
    padding: var(--time-card-padding);
    border-radius: var(--time-card-border-radius);
    min-width: 130px;
    text-align: center;
    font-family: $font-family-clock;
    font-size: var(--time-font-size);
    font-weight: 700;
    color: var(--time-card-color);
    text-shadow: var(--time-card-text-shadow);
    box-shadow: var(--time-card-shadow);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
    backface-visibility: hidden;
    
    &:hover {
      transform: translateY(-5px) rotateX(10deg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      pointer-events: none;
    }
  }

  .time-label {
    position: absolute;
    bottom: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    color: var(--time-label-color);
    font-size: var(--label-font-size);
    font-weight: 500;
    letter-spacing: 0.2em;
    padding: var(--time-label-padding);
    background: var(--time-label-background);
    border-radius: var(--time-label-border-radius);
    backdrop-filter: blur(5px);
    white-space: nowrap;
    transition: all 0.3s ease;
    border: var(--time-label-border);
    text-shadow: var(--time-label-shadow);
    
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--time-label-background);
    }
  }

  .time-block:hover .time-label {
    transform: translateX(-50%) translateY(-3px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .time-divider {
    color: var(--divider-color);
    font-size: var(--divider-font-size);
    font-weight: 300;
    animation: pulse 1.5s ease-in-out infinite;
    margin-top: -1rem;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }

  .date-section {
    text-align: center;
    color: var(--date-color);
    font-size: var(--date-font-size);
    font-weight: 600;
    letter-spacing: 0.05em;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid var(--date-border-color);
    position: relative;
    text-shadow: var(--time-label-shadow);
    transition: transform 0.3s ease;
    
    &::before {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--date-gradient);
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: var(--date-gradient);
      border-radius: 0 0 3px 3px;
      backdrop-filter: blur(2px);
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.5;
      transform: scale(0.95);
    }
  }

  @media (max-width: 768px) {
    .clock-card {
      padding: 2rem;
      border-radius: 25px;
    }

    .time-card {
      padding: 1.5rem 1rem;
      min-width: 90px;
      font-size: 3rem;
    }

    .time-section {
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .time-divider {
      font-size: 2.5rem;
    }

    .date-section {
      font-size: 1.4rem;
      padding-top: 1.5rem;
      margin-top: 0.8rem;
      
      &::after {
        width: 40px;
        height: 2px;
      }
    }

    .time-label {
      font-size: 0.9rem;
      padding: 0.3rem 0.8rem;
      bottom: -2.2rem;
    }
  }

  // 添加深色模式支持
  @media (prefers-color-scheme: dark) {
    .clock-card {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>