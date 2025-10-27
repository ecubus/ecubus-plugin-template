# 开发指南 / Development Guide

## 项目结构 / Project Structure

```
ecubus-plugin-template/
├── src/
│   ├── main/              # 主进程代码 / Main process code
│   │   └── index.ts       # 主进程入口，处理业务逻辑
│   └── renderer/          # 渲染进程代码 / Renderer process code
│       ├── App.vue        # Vue 主组件
│       └── index.ts       # 渲染进程入口
├── dist/                  # 构建输出目录 / Build output
│   ├── main/             # 主进程构建产物
│   └── renderer/         # 渲染进程构建产物
├── public/               # 静态资源 / Static assets
├── manifest.json         # 插件配置文件 / Plugin manifest
├── package.json          # 项目配置
└── vite.*.config.ts      # Vite 构建配置
```

## 核心概念 / Core Concepts

### 1. 主进程 (Main Process)

**位置**：`src/main/index.ts`

主进程运行在 Node.js 环境中，具有完整的系统访问权限。主要职责：

- 📡 注册服务供渲染进程调用
- 🔔 向渲染进程发送事件通知
- 💾 处理文件系统、数据库等操作
- 🔌 与硬件设备通信
- ⚡ 执行计算密集型任务

**核心 API：**

```typescript
// 注册服务
registerService('serviceName', (arg1, arg2) => {
  // 处理逻辑
  return result
})

// 发送事件
emitEvent('eventName', data)
```

### 2. 渲染进程 (Renderer Process)

**位置**：`src/renderer/App.vue` 和 `src/renderer/index.ts`

渲染进程运行在浏览器环境中，使用 Vue.js 构建 UI。主要职责：

- 🎨 显示用户界面
- 🖱️ 处理用户交互
- 📞 调用主进程服务
- 📡 监听主进程事件
- 📊 展示数据和状态

**核心 API：**

```typescript
// 调用主进程服务
const result = await callServerMethod('serviceName', arg1, arg2)

// 监听主进程事件
const unsubscribe = onEvent('eventName', (data) => {
  // 处理事件
})

// 使用共享数据
const data = useData()
data.key = value
```

### 3. 插件配置 (Manifest)

**位置**：`manifest.json`

配置插件的基本信息和扩展点：

```json
{
  "id": "插件唯一标识",
  "name": "插件显示名称",
  "version": "版本号",
  "mainEntry": "主进程入口文件",
  "extensions": [
    {
      "targetTab": "扩展的目标标签页",
      "items": [
        {
          "type": "button",
          "id": "按钮ID",
          "label": "按钮标签",
          "icon": "图标",
          "entry": "渲染进程入口URL"
        }
      ]
    }
  ]
}
```

## 开发工作流 / Development Workflow

### 1. 启动开发服务器

```bash
npm run dev
```

这个命令会并行执行两个任务：
- **渲染进程开发服务器**：在 `http://localhost:5174/` 启动，支持热模块替换（HMR）
- **主进程监听构建**：监听 `src/main/` 目录的文件变化，自动重新构建

这样你可以同时开发前端和后端代码，主进程的改动会自动编译到 `dist/main/` 目录。

**单独运行某个服务**：
```bash
npm run dev:renderer  # 仅启动前端开发服务器
npm run dev:main      # 仅监听并构建主进程代码
```

### 2. 修改代码

- **修改 UI**：编辑 `src/renderer/App.vue`
- **修改业务逻辑**：编辑 `src/main/index.ts`
- **修改插件配置**：编辑 `manifest.json`

### 3. 查看效果

在 EcuBus 应用中加载你的插件，点击扩展按钮即可看到效果。

### 4. 构建生产版本

```bash
npm run build
```

构建产物会生成在 `dist/` 目录。

## 常见开发场景 / Common Development Scenarios

### 场景 1：添加新的服务方法

**主进程** (`src/main/index.ts`)：

```typescript
registerService('myNewService', (param1: string, param2: number) => {
  // 处理逻辑
  const result = doSomething(param1, param2)
  return result
})
```

**渲染进程** (`src/renderer/App.vue`)：

```typescript
const result = await callServerMethod('myNewService', 'hello', 42)
console.log(result)
```

### 场景 2：从主进程向渲染进程发送事件

**主进程** (`src/main/index.ts`)：

```typescript
// 在某个事件发生时
emitEvent('dataUpdated', {
  data: newData,
  timestamp: Date.now()
})
```

**渲染进程** (`src/renderer/App.vue`)：

```typescript
const unsubscribe = onEvent('dataUpdated', (payload) => {
  console.log('数据更新：', payload.data)
})

// 组件卸载时取消监听
onUnmounted(() => {
  unsubscribe()
})
```

### 场景 3：使用共享数据

共享数据可以在渲染进程的不同组件间共享：

```typescript
// 组件 A
const data = useData()
data.userId = 123

// 组件 B（可以访问相同的数据）
const data = useData()
console.log(data.userId) // 123
```

### 场景 4：添加新的 UI 组件

创建新组件 `src/renderer/components/MyComponent.vue`：

```vue
<template>
  <div>我的组件</div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
/* 样式 */
</style>
```

在 `App.vue` 中使用：

```vue
<script setup lang="ts">
import MyComponent from './components/MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

## 调试技巧 / Debugging Tips

### 1. 主进程调试

主进程的 `console.log` 输出会显示在 EcuBus 应用的控制台中。

```typescript
console.log('[Main Process]', '调试信息')
```

### 2. 渲染进程调试

渲染进程的 `console.log` 输出会显示在浏览器开发者工具中。

```typescript
console.log('[Renderer]', '调试信息')
```

### 3. 使用 Vue DevTools

安装 Vue DevTools 浏览器扩展，可以查看组件树、状态、事件等。

### 4. 错误处理

始终使用 try-catch 处理异步操作：

```typescript
try {
  const result = await callServerMethod('serviceName')
} catch (error) {
  console.error('服务调用失败：', error)
}
```

## 性能优化 / Performance Optimization

### 1. 避免频繁的主进程调用

❌ 不好的做法：

```typescript
setInterval(async () => {
  const data = await callServerMethod('getData')
}, 100) // 每 100ms 调用一次
```

✅ 好的做法：

```typescript
// 主进程定期推送事件
setInterval(() => {
  emitEvent('dataUpdate', data)
}, 1000)

// 渲染进程监听事件
onEvent('dataUpdate', (data) => {
  // 更新 UI
})
```

### 2. 使用计算属性

对于需要计算的数据，使用 Vue 的 `computed`：

```typescript
const computedValue = computed(() => {
  return expensiveCalculation(data.value)
})
```

### 3. 合理使用响应式数据

只将需要响应式的数据放入 `ref` 或 `reactive`。

## 打包和发布 / Build and Release

### 1. 构建

```bash
npm run build
```

### 2. 测试构建产物

将 `dist/` 目录中的文件和 `manifest.json` 一起打包，在 EcuBus 中加载测试。

### 3. 发布

将插件打包成 `.zip` 或发布到插件市场。

## 常见问题 / FAQ

### Q: 如何访问 Node.js API？

A: 只能在主进程中访问。在 `src/main/index.ts` 中可以使用 `fs`, `path` 等 Node.js 模块。

### Q: 如何在渲染进程中使用 Node.js 功能？

A: 在主进程中注册服务，然后在渲染进程中通过 `callServerMethod` 调用。

### Q: 插件如何持久化数据？

A: 在主进程中使用文件系统或数据库存储数据。

### Q: 如何添加第三方 npm 包？

A: 运行 `npm install package-name`，然后在代码中导入使用。

### Q: 热更新不工作？

A: 确保开发服务器正在运行，并且 `manifest.json` 中的 `entry` 指向 `http://localhost:5174/`。

## 最佳实践 / Best Practices

1. ✅ **保持主进程轻量**：将 UI 逻辑放在渲染进程
2. ✅ **错误处理**：所有异步操作都要有错误处理
3. ✅ **类型安全**：充分利用 TypeScript 的类型检查
4. ✅ **代码注释**：为复杂逻辑添加清晰的注释
5. ✅ **清理资源**：在组件卸载时清理定时器、事件监听器
6. ✅ **版本管理**：使用语义化版本号
7. ✅ **测试**：为关键功能编写测试

## 参考资源 / Resources

- [EcuBus 官方文档](https://ecubus.io/)
- [Vue.js 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vite.dev/)
- [Electron 文档](https://www.electronjs.org/)

---

Happy coding! 🎉 如有问题，请查阅文档或联系社区。

