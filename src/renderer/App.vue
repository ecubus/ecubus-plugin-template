<template>
  <div class="container">
    <h1>🎉 Hello EcuBus Plugin!</h1>
    <p class="subtitle">这是一个简单的插件示例 / A Simple Plugin Example</p>

    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header">👋 Say Hello</div>
      </template>

      <el-input v-model="name" placeholder="输入你的名字 / Your name" clearable class="mb-16" />

      <el-button type="primary" @click="sayHello" class="w-100">Say Hello</el-button>

      <div class="mt-12" v-if="message">
        <el-alert :title="message" type="success" show-icon />
      </div>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header">🔢 Counter</div>
      </template>

      <div class="counter">{{ count }}</div>
      <el-button type="success" @click="increment" class="w-100">+1</el-button>
    </el-card>

    <el-card class="card" shadow="hover">
      <template #header>
        <div class="card-header">🚦 Global Start Status</div>
      </template>

      <div class="status-indicator">
        <div
          class="status-light"
          :class="{ 'status-on': globalStart, 'status-off': !globalStart }"
        ></div>
        <span class="status-text">{{ globalStart ? '运行中 / Running' : '已停止 / Stopped' }}</span>
      </div>
    </el-card>

    <el-card class="card info" shadow="never">
      <template #header>
        <div class="card-header">📚 快速开始 / Quick Start</div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="UI"
          >修改 <code>src/renderer/App.vue</code> 来编辑 UI</el-descriptions-item
        >
        <el-descriptions-item label="Main"
          >修改 <code>src/main/index.ts</code> 来添加业务逻辑</el-descriptions-item
        >
        <el-descriptions-item label="Docs"
          >查看 <code>README.md</code> 了解更多</el-descriptions-item
        >
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { callServerMethod, useGlobalStart } from '@ecubus-pro/renderer-plugin-sdk'

const name = ref('World')
const message = ref('')
const count = ref(0)
const globalStart = useGlobalStart()
watch(globalStart, (newVal) => {
  console.log('globalStart', newVal)
})
async function sayHello() {
  try {
    const response = await callServerMethod('sayHello', name.value)
    message.value = response.message
  } catch (error) {
    message.value = '调用失败 / Call failed'
    console.error(error)
  }
}

function increment() {
  count.value++
}
</script>

<style scoped>
.container {
  max-width: 680px;
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
  margin-bottom: 24px;
}

.card {
  margin-bottom: 20px;
}

.card-header {
  font-weight: 600;
  color: #2c3e50;
}

.counter {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #42b983;
  margin: 16px 0 20px;
}

/* helpers */
.w-100 {
  width: 100%;
}
.mb-16 {
  margin-bottom: 16px;
}
.mt-12 {
  margin-top: 12px;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 0;
}

.status-light {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.status-on {
  background-color: #67c23a;
  box-shadow: 0 0 12px rgba(103, 194, 58, 0.6);
}

.status-off {
  background-color: #f56c6c;
  box-shadow: 0 0 12px rgba(245, 108, 108, 0.6);
}

.status-text {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}
</style>
