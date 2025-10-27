#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { exec } from 'node:child_process'

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 颜色输出辅助函数
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
}

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✖${colors.reset} ${msg}`)
}

// 获取项目名称
const projectName = process.argv[2] || 'my-ecubus-plugin'

// 目标目录
const targetDir = path.join(process.cwd(), projectName)

// 模板目录
const templateDir = path.resolve(__dirname, '../template')

// 如果 template 目录不存在，则使用当前目录作为模板（开发模式）
const sourceDir = fs.existsSync(templateDir) ? templateDir : path.resolve(__dirname, '..')

console.log(`\n${colors.bright}${colors.cyan}🚀 Creating EcuBus Plugin Project...${colors.reset}\n`)

// 检查目标目录是否已存在
if (fs.existsSync(targetDir)) {
  log.error(`Directory ${projectName} already exists!`)
  process.exit(1)
}

// 复制文件和目录
function copyDirectory(src, dest, templateName) {
  // 创建目标目录
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  // 读取源目录
  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    // 跳过不需要复制的文件和目录
    const skipList = [
      'node_modules',
      'dist',
      '.git',
      'bin',
      'template',
      'package-lock.json',
      '.DS_Store'
    ]

    if (skipList.includes(entry.name)) {
      continue
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, templateName)
    } else {
      let content = fs.readFileSync(srcPath, 'utf8')

      // 替换模板中的占位符
      if (entry.name === 'package.json') {
        const pkg = JSON.parse(content)
        pkg.name = templateName
        pkg.version = '0.0.1'
        delete pkg.bin
        delete pkg.files
        delete pkg.keywords
        pkg.private = true
        content = JSON.stringify(pkg, null, 2) + '\n'
      }

      if (entry.name === 'manifest.json') {
        const manifest = JSON.parse(content)
        manifest.id = templateName
        manifest.name = templateName
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        content = JSON.stringify(manifest, null, 2) + '\n'
      }

      fs.writeFileSync(destPath, content)
    }
  }
}

try {
  log.info(`Creating project in ${targetDir}...`)
  copyDirectory(sourceDir, targetDir, projectName)
  log.success('Project files created successfully!')

  // 初始化 Git 仓库
  try {
    log.info('Initializing git repository...')
    await execAsync('git init', { cwd: targetDir })
    log.success('Git repository initialized!')
  } catch (error) {
    log.warn('Failed to initialize git repository (git may not be installed)')
  }

  // 输出成功消息和下一步指引
  console.log(`\n${colors.green}${colors.bright}✨ Success!${colors.reset} Created ${projectName} at ${targetDir}\n`)
  console.log('Inside that directory, you can run several commands:\n')
  console.log(`  ${colors.cyan}npm install${colors.reset}`)
  console.log('    Install dependencies\n')
  console.log(`  ${colors.cyan}npm run dev${colors.reset}`)
  console.log('    Start the development server\n')
  console.log(`  ${colors.cyan}npm run build${colors.reset}`)
  console.log('    Build for production\n')
  console.log(`  ${colors.cyan}npm run lint${colors.reset}`)
  console.log('    Lint and fix files\n')
  console.log('We suggest that you begin by typing:\n')
  console.log(`  ${colors.cyan}cd ${projectName}${colors.reset}`)
  console.log(`  ${colors.cyan}npm install${colors.reset}`)
  console.log(`  ${colors.cyan}npm run dev${colors.reset}\n`)
  console.log('Happy coding! 🎉\n')
} catch (error) {
  log.error('Failed to create project:')
  console.error(error)
  process.exit(1)
}

