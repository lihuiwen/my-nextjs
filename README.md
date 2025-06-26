# Next.js 前端项目

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

基于 Next.js 15 App Router 构建的现代化前端应用，提供文章管理和 GitHub 仓库展示功能。

## 🚀 功能特性

### 📚 文章管理
- ✅ 文章列表展示和筛选
- ✅ 创建新文章功能
- ✅ 按作者和发布状态筛选
- ✅ 文章删除功能
- ✅ 响应式设计

### 🐙 GitHub 集成
- ✅ GitHub 仓库列表展示
- ✅ 仓库信息展示（Star、Fork、语言等）
- ✅ 一键跳转到 GitHub 仓库
- ✅ 语言标识和统计

### 🎨 界面特性
- ✅ 现代化 UI 设计
- ✅ 深色主题友好
- ✅ 移动端适配
- ✅ 加载状态和错误处理
- ✅ 平滑动画效果

## 📁 项目结构

```
src/
├── app/
│   ├── layout.tsx              # 根布局
│   ├── page.tsx                # 首页
│   ├── globals.css             # 全局样式
│   ├── posts/
│   │   ├── page.tsx           # 文章列表页
│   │   └── create/
│   │       └── page.tsx       # 创建文章页
│   ├── github/
│   │   └── repositories/
│   │       └── page.tsx       # GitHub 仓库页
│   └── api/
│       ├── database/
│       │   ├── posts/
│       │   │   ├── route.ts   # 文章 API 代理
│       │   │   └── [id]/
│       │   │       └── route.ts # 文章操作 API
│       │   └── users/
│       │       └── route.ts   # 用户 API 代理
│       └── github/
│           └── repositories/
│               └── route.ts   # GitHub API 代理
├── .env.local                  # 环境变量配置
├── next.config.ts             # Next.js 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目依赖
```

## 🛠️ 技术栈

- **框架**: Next.js 15.3.2 (App Router)
- **语言**: TypeScript 5.x
- **样式**: Tailwind CSS 3.x
- **构建**: Turbopack (Next.js 内置)
- **包管理**: npm

## 📦 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd my-nextjs-app
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **环境配置**
   ```bash
   # 复制环境变量文件
   cp .env.example .env.local
   
   # 编辑环境变量
   vim .env.local
   ```

4. **配置环境变量**
   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```

6. **访问应用**
   ```
   http://localhost:3000
   ```

## 🌐 页面路由

| 路由 | 页面 | 功能描述 |
|------|------|----------|
| `/` | 首页 | 应用概览和快速导航 |
| `/posts` | 文章列表 | 展示所有文章，支持筛选和搜索 |
| `/posts/create` | 创建文章 | 新建文章表单 |
| `/github/repositories` | GitHub 仓库 | 展示 GitHub 仓库列表 |

## 🔌 API 接口

### 前端 API 代理路由

| 端点 | 方法 | 功能 | 对应后端 API |
|------|------|------|-------------|
| `/api/database/posts` | GET | 获取文章列表 | `GET /database/posts` |
| `/api/database/posts` | POST | 创建文章 | `POST /database/posts` |
| `/api/database/posts/[id]` | DELETE | 删除文章 | `DELETE /database/posts/[id]` |
| `/api/database/users` | GET | 获取用户列表 | `GET /database/users` |
| `/api/github/repositories` | GET | 获取仓库列表 | `GET /github/repositories` |

## ⚙️ 开发脚本

```bash
# 开发模式启动
npm run dev

# 生产构建
npm run build

# 生产模式启动
npm run start

# 代码检查
npm run lint

# 类型检查
npm run type-check
```

## 🔧 配置说明

### 环境变量

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000  # 后端 API 地址
```

**注意**: 
- 所有以 `NEXT_PUBLIC_` 开头的变量会暴露给浏览器
- 修改环境变量后需要重启开发服务器

### Next.js 配置

```typescript
// next.config.ts
const nextConfig = {
  // 生产环境优化配置
}
```

### Tailwind CSS 配置

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 自定义样式扩展
    },
  },
  plugins: [],
}
```

## 🎨 UI 组件设计

### 卡片组件
- **文章卡片**: 显示标题、作者、发布状态、创建时间
- **仓库卡片**: 显示仓库名、描述、语言、Star 数
- **用户卡片**: 显示用户信息和文章统计

### 交互元素
- **筛选器**: 支持按作者、发布状态筛选
- **搜索功能**: 实时搜索文章内容
- **分页导航**: 大数据量时的分页显示
- **加载动画**: 优雅的加载状态展示

## 📱 响应式设计

### 断点设置
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### 布局适配
- 移动端单列布局
- 平板双列网格
- 桌面三列网格

## 🔍 调试指南

### 开发者工具使用

1. **网络请求调试**
   - 打开浏览器开发者工具 (F12)
   - 查看 Network 标签页
   - 监控 API 请求状态

2. **控制台日志**
   ```javascript
   // API 调用会输出详细日志
   console.log('🔄 请求开始...')
   console.log('📥 收到响应:', response)
   ```

3. **错误排查**
   - 检查后端服务是否启动
   - 验证环境变量配置
   - 确认 API 路径正确

### 常见问题解决

#### 1. API 请求 404 错误
```bash
# 检查后端服务状态
curl http://localhost:8000/database/posts

# 检查环境变量
echo $NEXT_PUBLIC_API_URL
```

#### 2. 页面样式不生效
```bash
# 重新构建 Tailwind CSS
npm run dev
```

#### 3. TypeScript 类型错误
```bash
# 运行类型检查
npx tsc --noEmit
```

## 🚀 部署指南

### Vercel 部署 (推荐)

1. **连接 GitHub 仓库**
   ```bash
   # 推送代码到 GitHub
   git push origin main
   ```

2. **配置环境变量**
   - 在 Vercel 项目设置中添加 `NEXT_PUBLIC_API_URL`
   - 指向生产环境的后端 API 地址

3. **自动部署**
   - Vercel 会自动检测 Next.js 项目
   - 每次推送代码都会自动重新部署

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# 构建和运行
docker build -t my-nextjs-app .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api-url my-nextjs-app
```

## 🧪 测试

### 手动测试检查清单

- [ ] 首页正常加载
- [ ] 文章列表显示数据
- [ ] 创建文章功能正常
- [ ] 文章删除功能正常
- [ ] GitHub 仓库列表显示
- [ ] 筛选功能正常工作
- [ ] 移动端布局正常
- [ ] 错误处理正常显示

### API 测试

```bash
# 测试 API 代理
curl http://localhost:3000/api/database/posts
curl http://localhost:3000/api/database/users
curl http://localhost:3000/api/github/repositories
```

## 🔒 安全注意事项

1. **环境变量管理**
   - 不要将敏感信息放在客户端环境变量中
   - 使用 `NEXT_PUBLIC_` 前缀要谨慎

2. **API 安全**
   - 前端 API 路由仅作为代理，不包含业务逻辑
   - 所有验证和授权在后端进行

3. **HTTPS 使用**
   - 生产环境必须使用 HTTPS
   - 配置适当的 CORS 策略

## 🤝 贡献指南

1. **分支管理**
   ```bash
   # 创建功能分支
   git checkout -b feature/new-feature
   
   # 提交更改
   git commit -m "Add new feature"
   
   # 推送分支
   git push origin feature/new-feature
   ```

2. **代码规范**
   - 使用 TypeScript 严格模式
   - 遵循 ESLint 规则
   - 使用 Prettier 格式化代码

3. **提交信息**
   ```bash
   # 功能添加
   git commit -m "feat: add user search functionality"
   
   # 问题修复
   git commit -m "fix: resolve API timeout issue"
   
   # 样式更新
   git commit -m "style: improve mobile layout"
   ```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全

---

⭐ **如果这个项目对您有帮助，请给它一个 star！**

**Happy Coding! 🎉**