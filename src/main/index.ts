/**
 * EcuBus 插件主进程入口
 * Main process entry for EcuBus plugin
 * 
 * 在这里注册服务供渲染进程调用
 * Register services here for renderer process to call
 */

import { registerService } from '@ecubus-pro/main-plugin-sdk'

/**
 * 注册一个简单的服务
 * Register a simple service
 */
registerService('sayHello', (name: string) => {
  console.log(`[Main] Hello from ${name}!`)
  
  // 返回欢迎消息
  // Return welcome message
  return {
    success: true,
    message: `Welcome to EcuBus, ${name}! 🎉`
  }
})