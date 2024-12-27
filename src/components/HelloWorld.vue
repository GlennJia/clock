<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="form-container">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">姓名：</label>
          <input 
            type="text" 
            id="name" 
            v-model="formData.name" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email" 
            required
          >
        </div>

        <button type="submit" class="submit-btn">提交</button>
      </form>
    </div>

    <MessageDialog
      :visible.sync="showDialog"
      title="欢迎"
      :message="welcomeMessage"
    />
  </div>
</template>

<script>
import MessageDialog from 'messageDialog.vue'

export default {
  name: 'HelloWorld',
  components: {
    MessageDialog
  },
  props: {
    msg: String
  },
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      showDialog: false
    }
  },
  computed: {
    welcomeMessage() {
      return `欢迎 ${this.formData.name}！我们会将确认信息发送到 ${this.formData.email}`
    }
  },
  methods: {
    handleSubmit() {
      this.showDialog = true
      // 这里可以添加发送数据到后端的逻辑
    }
  }
}
</script>

<style scoped lang="scss">
.form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #3aa876;
  }
}

.welcome-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f7f4;
  border-radius: 4px;
  color: #42b983;
}
</style>
