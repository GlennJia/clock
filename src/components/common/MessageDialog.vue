<template>
  <Transition name="dialog">
    <div class="message-dialog" v-if="visible">
      <div class="dialog-overlay" @click="closeDialog"></div>
      <div class="dialog-content">
        <div class="dialog-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="closeDialog">&times;</button>
        </div>
        <div class="dialog-body">
          <slot>{{ message }}</slot>
        </div>
        <div class="dialog-footer">
          <button class="btn" @click="closeDialog">确定</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'MessageDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
.message-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  transition: var(--transition);
}

.dialog-content {
  position: relative;
  background: var(--white);
  padding: 24px;
  border-radius: var(--radius-lg);
  min-width: 320px;
  max-width: 90%;
  box-shadow: var(--shadow-lg);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-color);
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--text-light);
  padding: 4px;
  margin: -4px;
  transition: var(--transition);
  border-radius: var(--radius-sm);
  
  &:hover {
    color: var(--text-color);
    background-color: var(--bg-gray);
  }
}

.dialog-body {
  margin-bottom: 24px;
  color: var(--text-light);
  font-size: 16px;
  line-height: 1.6;
}

.dialog-footer {
  text-align: right;
  
  .btn {
    min-width: 100px;
  }
}

// 弹窗动画
.dialog-enter-active,
.dialog-leave-active {
  transition: var(--transition);
  
  .dialog-overlay {
    transition: opacity 0.3s ease;
  }
  
  .dialog-content {
    transition: all 0.3s ease;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  
  .dialog-content {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  
  .dialog-content {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style> 