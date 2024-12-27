<template>
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
        <button class="confirm-btn" @click="closeDialog">确定</button>
      </div>
    </div>
  </div>
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
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  h3 {
    margin: 0;
    font-size: 18px;
    color: #2c3e50;
  }
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0 5px;
  
  &:hover {
    color: #333;
  }
}

.dialog-body {
  margin-bottom: 20px;
  color: #666;
}

.dialog-footer {
  text-align: right;
}

.confirm-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #3aa876;
  }
}
</style> 