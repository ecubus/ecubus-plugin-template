# create-ecubus-plugin

🚀 EcuBus 插件项目模板脚手架工具。快速创建基于 Vue 3 + TypeScript + Vite 的 EcuBus 插件项目。

## ✨ 特性

- ⚡️ **快速开始** - 一行命令创建项目
- 🎨 **现代技术栈** - Vue 3 + TypeScript + Vite
- 📦 **开箱即用** - 预配置 ESLint + Prettier
- 🔧 **插件 SDK** - 集成 EcuBus 主进程和渲染进程插件 SDK
- 🚀 **热更新** - 开发服务器支持热模块替换
- 📝 **类型安全** - 完整的 TypeScript 支持
- 💡 **Hello World 示例** - 包含完整的示例代码和详细注释
- 📚 **详细文档** - 中英双语注释和开发指南

## 使用方法

### 使用 npm

```bash
npm create ecubus-plugin@latest my-plugin
```

### 使用 pnpm

```bash
pnpm create ecubus-plugin my-plugin
```

### 使用 yarn

```bash
yarn create ecubus-plugin my-plugin
```

### 使用 bun

```bash
bun create ecubus-plugin my-plugin
```

然后进入项目目录并安装依赖：

```bash
cd my-plugin
npm install
```

## 📖 Hello World 示例说明

创建的项目是一个简单的 Hello World 示例，包含两个基础功能：

### 1. 👋 Say Hello
- 展示如何调用主进程服务
- 简单的输入和按钮交互
- 显示服务返回的消息

### 2. 🔢 Counter
- 展示 Vue 3 响应式数据
- 简单的计数器示例

所有代码都包含中英文注释，非常适合快速入门！

## 🛠️ 开发

### 启动开发服务器

```bash
npm run dev
```

这个命令会同时：
- 🎨 启动渲染进程开发服务器（`http://localhost:5173/`），支持热模块替换（HMR）
- 🔧 监听主进程代码变化，自动重新构建

你也可以单独运行：
```bash
npm run dev:main      # 仅监听主进程
npm run dev:renderer  # 仅启动前端服务器
```

### 构建生产版本

```bash
npm run build
```

构建输出将生成在 `dist/` 目录：
- `dist/main/` - 主进程代码（Node.js 环境）
- `dist/renderer/` - 渲染进程代码（浏览器环境）

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 📁 项目结构

```
my-plugin/
├── src/
│   ├── main/              # 主进程代码（Node.js 环境）
│   │   └── index.ts       # 注册服务、发送事件、处理业务逻辑
│   └── renderer/          # 渲染进程代码（浏览器环境）
│       ├── App.vue        # Vue 主组件，UI 界面
│       └── index.ts       # 渲染进程入口
├── public/                # 静态资源
├── dist/                  # 构建输出目录
│   ├── main/             # 主进程构建产物
│   └── renderer/         # 渲染进程构建产物
├── manifest.json          # 插件配置文件（重要！）
├── package.json           # 项目依赖配置
├── vite.*.config.ts       # Vite 构建配置
├── DEVELOPMENT.md         # 详细开发指南 👈 建议阅读
└── README.md
```

## 配置文件说明

### manifest.json

插件的配置文件，定义插件的基本信息和扩展点：

```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "插件描述",
  "author": "作者名",
  "mainEntry": "dist/main/index.cjs",
  "icon": "icon.png",
  "readme": "README.md",
  "extensions": [
    {
      "targetTab": "test",
      "items": [
        {
          "type": "button",
          "id": "my-button",
          "label": "My Button",
          "icon": "mdi:help-circle",
          "onClick": "handleClick",
          "entry": "http://localhost:5174/"
        }
      ]
    }
  ]
}
```

### package.json

标准的 npm 包配置文件，包含项目依赖和脚本命令。

### vite.*.config.ts

Vite 构建配置文件，分别用于主进程和渲染进程的构建配置。

## 推荐的 IDE 设置

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展（禁用 Vetur）

## 推荐的浏览器设置

### Chromium 内核浏览器（Chrome、Edge、Brave 等）

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [启用自定义对象格式化](http://bit.ly/object-formatters)

### Firefox

- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [启用自定义对象格式化](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 TypeScript 支持

项目使用 `vue-tsc` 进行类型检查。编辑器需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展来识别 `.vue` 文件的类型。

## 🎓 学习路径

1. **查看示例代码** - 打开 `src/main/index.ts` 和 `src/renderer/App.vue`，查看详细注释
2. **运行项目** - 执行 `npm run dev` 启动开发服务器
3. **在 EcuBus 中加载** - 将插件加载到 EcuBus 应用中查看效果
4. **阅读开发指南** - 查看 `DEVELOPMENT.md` 了解更多开发细节
5. **修改代码** - 尝试修改代码，创建你自己的插件功能

## 📦 依赖说明

### 核心依赖

- `vue` - Vue 3 框架
- `@ecubus-pro/main-plugin-sdk` - EcuBus 主进程插件 SDK
- `@ecubus-pro/renderer-plugin-sdk` - EcuBus 渲染进程插件 SDK

### 开发依赖

- `vite` - 构建工具
- `typescript` - TypeScript 编译器
- `vue-tsc` - Vue TypeScript 类型检查
- `eslint` - 代码检查工具
- `prettier` - 代码格式化工具

## 发布插件

1. 确保 `manifest.json` 中的版本号和信息正确
2. 运行 `npm run build` 构建项目
3. 将构建产物和配置文件打包发布

## 📚 参考资源

- 📖 [DEVELOPMENT.md](./DEVELOPMENT.md) - 详细开发指南（强烈推荐）
- 🌐 [EcuBus 官方文档](https://ecubus.io/)
- 🎨 [Vue 3 文档](https://vuejs.org/)
- ⚡ [Vite 文档](https://vite.dev/)
- 📘 [TypeScript 文档](https://www.typescriptlang.org/)

## 💬 获取帮助

遇到问题？

1. 查看 [DEVELOPMENT.md](./DEVELOPMENT.md) 的常见问题部分
2. 查看 [EcuBus 官方文档](https://ecubus.io/)
3. 在 GitHub 上提交 Issue
4. 加入社区讨论

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何参与项目。

## 📄 License

MIT

---

🎉 **Happy coding!** 开始创建你的第一个 EcuBus 插件吧！
