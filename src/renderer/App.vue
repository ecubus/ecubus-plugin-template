<template>
  <div class="container">
    <!-- 标题 / Title -->
    <h1>🎉 Hello EcuBus Plugin!</h1>
    <p class="subtitle">这是一个简单的插件示例 / A Simple Plugin Example</p>

    <!-- 调用主进程服务示例 / Call Main Process Service Example -->
    <div class="card">
      <h2>👋 Say Hello</h2>
      <input 
        v-model="name" 
        type="text" 
        placeholder="输入你的名字 / Your name"
        class="input"
      />
      <button @click="sayHello" class="button">Say Hello</button>
      
      <!-- 显示响应结果 / Show Response -->
      <div v-if="message" class="message">
        {{ message }}
      </div>
    </div>

    <!-- 计数器示例 / Counter Example -->
    <div class="card">
      <h2>🔢 Counter</h2>
      <p class="counter">{{ count }}</p>
      <button @click="increment" class="button">+1</button>
    </div>

    <!-- 快速开始 / Quick Start -->
    <div class="card info">
      <h3>📚 快速开始 / Quick Start</h3>
      <ul>
        <li>修改 <code>src/renderer/App.vue</code> 来编辑 UI</li>
        <li>修改 <code>src/main/index.ts</code> 来添加业务逻辑</li>
        <li>查看 <code>README.md</code> 了解更多</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { callServerMethod } from '@ecubus-pro/renderer-plugin-sdk'

// 用户名输入 / User name input
const name = ref('World')

// 响应消息 / Response message
const message = ref('')

// 计数器 / Counter
const count = ref(0)

/**
 * 调用主进程服务
 * Call main process service
 */
async function sayHello() {
  try {
    const response = await callServerMethod('sayHello', name.value)
    message.value = response.message
  } catch (error) {
    message.value = '调用失败 / Call failed'
    console.error(error)
  }
}

/**
 * 增加计数
 * Increment counter
 */
function increment() {
  count.value++
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #42b983;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
}

.card {
  background: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-top: 0;
  color: #2c3e50;
}

.input {
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #42b983;
}

.button {
  width: 100%;
  padding: 12px 24px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.button:hover {
  background: #35a372;
}

.message {
  margin-top: 15px;
  padding: 15px;
  background: #f0f9ff;
  border-left: 4px solid #42b983;
  border-radius: 4px;
  color: #2c3e50;
}

.counter {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #42b983;
  margin: 20px 0;
}

.info {
  background: #f8f9fa;
}

.info h3 {
  margin-top: 0;
  color: #2c3e50;
}

.info ul {
  margin: 0;
  padding-left: 20px;
}

.info li {
  margin: 10px 0;
  color: #666;
}

.info code {
  background: #e7f2fa;
  padding: 2px 6px;
  border-radius: 3px;
  color: #2c3e50;
  font-size: 14px;
}
</style>
