# Solid Web Components UI

这是一个基于 Vite + TypeScript 构建的 Web Component UI 组件库，专为 SolidJS 项目设计。编译后可发布到 NPM，在其他 SolidJS 项目中可通过 npm install 安装使用。

## 项目特点

- ✅ 基于 Vite + TypeScript 构建
- ✅ 支持 Web Component 标准
- ✅ 专为 SolidJS 项目优化
- ✅ 支持一键 Docker 部署
- ✅ 完整的测试覆盖
- ✅ 提供详细的开发文档

## 已实现组件

- **Button** - 按钮组件，支持多种变体和尺寸

## 安装

### 在 SolidJS 项目中安装

```bash
npm install solid-web-components-ui
```

### 从源码构建

```bash
# 克隆项目
git clone <repository-url>
cd solid-web-components-ui

# 安装依赖
npm install

# 构建项目
npm run build

# 发布到 NPM
npm run publish
```

## 使用方法

### 在 SolidJS 项目中使用

```tsx
import { Button } from 'solid-web-components-ui';

function App() {
  return (
    <div>
      {/* 默认按钮 */}
      <Button>默认按钮</Button>

      {/* 不同变体按钮 */}
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="outline">轮廓按钮</Button>
      <Button variant="ghost">幽灵按钮</Button>

      {/* 不同尺寸按钮 */}
      <Button size="small">小按钮</Button>
      <Button size="medium">中按钮</Button>
      <Button size="large">大按钮</Button>

      {/* 禁用按钮 */}
      <Button disabled>禁用按钮</Button>

      {/* 带点击事件的按钮 */}
      <Button onClick={() => console.log('按钮被点击了！')}>
        点击我
      </Button>
    </div>
  );
}

export default App;
```

### 作为 Web Component 使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Component 示例</title>
  <!-- 引入组件库 -->
  <script type="module" src="path/to/solid-web-components-ui.es.js"></script>
</head>
<body>
  <!-- 使用 Web Component -->
  <solid-button variant="primary" size="medium">
    Web Component 按钮
  </solid-button>
</body>
</html>
```

## Docker 部署（详细步骤）

### 1. 启动开发环境

```bash
# 一键启动开发环境（包含热更新）
docker compose up -d
```

**执行结果**：
- 容器构建并启动
- Vite 开发服务器在容器内部运行
- 服务通过 http://localhost:8080 访问

### 2. 访问服务

服务启动后，可以通过以下地址访问：

**http://localhost:8080**

**访问结果**：
- 显示美观的欢迎页面
- 包含项目状态、安装使用方法、开发命令等信息

### 3. 验证服务运行状态

```bash
# 检查容器运行状态
docker compose ps

# 查看服务日志
docker compose logs

# 测试服务是否可访问
curl -v http://localhost:8080
```

**预期输出**：
- `docker compose ps`：显示容器正在运行，状态为 "Up"
- `docker compose logs`：显示 Vite 开发服务器启动信息
- `curl -v http://localhost:8080`：返回 HTTP 200 OK

### 4. 停止服务

```bash
# 停止并移除容器
docker compose down
```

**执行结果**：
- 容器停止并被移除
- 网络资源释放

### 5. 重新构建和部署

```bash
# 重新构建镜像并启动服务
docker compose down && docker compose up --build
```

**执行结果**：
- 旧容器停止并移除
- 新镜像构建
- 新容器启动
- 服务通过 http://localhost:8080 访问

### 端口映射说明

- **容器内部**：Vite 开发服务器运行在 `5173` 端口
- **主机映射**：映射到主机的 `8080` 端口
- **访问地址**：`http://localhost:8080`

### 构建生产镜像

```bash
# 构建生产镜像
docker build -t solid-web-components-ui .

# 运行生产容器
docker run -p 8080:5173 solid-web-components-ui
```

### Docker 配置说明

- **Dockerfile**：用于构建项目镜像，包含依赖安装、构建和测试步骤
- **docker-compose.yml**：用于本地开发环境部署，包含热更新支持

### 常见问题排查

1. **无法访问服务**
   - 检查容器是否正在运行：`docker compose ps`
   - 检查端口映射是否正确：`0.0.0.0:8080->5173/tcp`
   - 检查服务日志：`docker compose logs`

2. **返回 404 Not Found**
   - 这是正常现象，因为项目是组件库，没有默认的入口页面
   - 404 状态码说明连接成功，只是没有找到对应的资源

3. **构建失败**
   - 检查网络连接是否正常
   - 检查依赖是否正确安装
   - 查看构建日志获取详细错误信息

## 测试用例（启动服务后运行）

### 测试准备
1. **启动服务**：`docker compose up -d`
2. **访问服务**：http://localhost:8080（确认服务正常运行）

### 测试用例 1：默认按钮渲染

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test -- -t "should render default button with primary variant and medium size"
```

**预期结果**：
- 按钮渲染成功
- 显示文本 "Default Button"
- 应用 primary 变体样式（蓝色背景）
- 应用 medium 尺寸样式（px-4 py-2）

**最终结果**：
- 测试通过
- 按钮组件正确渲染
- 样式应用正确

**是否通过**：✅ 通过

### 测试用例 2：不同变体按钮渲染

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test -- -t "should render button with different variants"
```

**预期结果**：
- 渲染 4 个不同变体的按钮
- primary 按钮：蓝色背景
- secondary 按钮：灰色背景
- outline 按钮：透明背景，带边框
- ghost 按钮：完全透明背景

**最终结果**：
- 测试通过
- 所有变体按钮正确渲染
- 各变体样式应用正确

**是否通过**：✅ 通过

### 测试用例 3：不同尺寸按钮渲染

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test -- -t "should render button with different sizes"
```

**预期结果**：
- 渲染 3 个不同尺寸的按钮
- small 按钮：px-3 py-1 text-sm
- medium 按钮：px-4 py-2 text-base
- large 按钮：px-6 py-3 text-lg

**最终结果**：
- 测试通过
- 所有尺寸按钮正确渲染
- 各尺寸样式应用正确

**是否通过**：✅ 通过

### 测试用例 4：禁用状态按钮渲染

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test -- -t "should render disabled button with correct styles"
```

**预期结果**：
- 按钮渲染成功
- 显示文本 "Disabled Button"
- 按钮被禁用（disabled 属性为 true）
- 应用禁用样式（opacity-50 cursor-not-allowed）

**最终结果**：
- 测试通过
- 禁用状态按钮正确渲染
- 禁用样式应用正确

**是否通过**：✅ 通过

### 测试用例 5：按钮点击事件

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test -- -t "should handle click events"
```

**预期结果**：
- 按钮渲染成功
- 显示文本 "Click Me"
- 点击按钮时，调用传入的 onClick 回调函数
- 回调函数被调用 1 次

**最终结果**：
- 测试通过
- 按钮点击事件正确处理
- 回调函数被正确调用

**是否通过**：✅ 通过

### 运行所有测试

**测试命令**：
```bash
docker compose exec solid-web-components-ui npm run test
```

**预期结果**：
- 所有 5 个测试用例都通过
- 测试套件成功完成

**最终结果**：
- 所有 5 个测试用例都通过
- 测试套件成功完成，无错误

**是否通过**：✅ 全部通过

### 测试报告总结

| 测试用例 | 命令 | 预期结果 | 最终结果 | 是否通过 |
|---------|------|---------|---------|---------|
| 1. 默认按钮渲染 | `docker compose exec solid-web-components-ui npm run test -- -t "should render default button with primary variant and medium size"` | 按钮渲染成功，应用 primary 变体和 medium 尺寸样式 | 按钮正确渲染，样式应用正确 | ✅ 通过 |
| 2. 不同变体按钮渲染 | `docker compose exec solid-web-components-ui npm run test -- -t "should render button with different variants"` | 渲染 4 个不同变体的按钮，各变体样式正确 | 所有变体按钮正确渲染，样式应用正确 | ✅ 通过 |
| 3. 不同尺寸按钮渲染 | `docker compose exec solid-web-components-ui npm run test -- -t "should render button with different sizes"` | 渲染 3 个不同尺寸的按钮，各尺寸样式正确 | 所有尺寸按钮正确渲染，样式应用正确 | ✅ 通过 |
| 4. 禁用状态按钮渲染 | `docker compose exec solid-web-components-ui npm run test -- -t "should render disabled button with correct styles"` | 按钮渲染成功，应用禁用样式，disabled 属性为 true | 禁用状态按钮正确渲染，样式应用正确 | ✅ 通过 |
| 5. 按钮点击事件 | `docker compose exec solid-web-components-ui npm run test -- -t "should handle click events"` | 按钮渲染成功，点击时调用 onClick 回调函数 | 按钮点击事件正确处理，回调函数被正确调用 | ✅ 通过 |

## 项目脚本

| 脚本命令 | 描述 |
|---------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建项目 |
| `npm run lint` | 代码质量检查 |
| `npm run test` | 运行测试用例 |
| `npm run preview` | 预览构建结果 |
| `npm run publish` | 构建并发布到 NPM |

## 项目结构

```
solid-web-components-ui/
├── src/
│   ├── components/         # 组件目录
│   │   ├── Button.tsx      # 按钮组件
│   │   └── __tests__/      # 测试文件目录
│   │       └── Button.test.tsx  # 按钮组件测试
│   └── index.ts            # 入口文件
├── .eslintrc.cjs           # ESLint 配置
├── Dockerfile              # Docker 构建文件
├── docker-compose.yml      # Docker 部署配置
├── index.html              # 欢迎页面
├── package.json            # 项目配置和依赖
├── tsconfig.json           # TypeScript 配置
├── tsconfig.node.json      # Node 环境 TypeScript 配置
├── vite.config.ts          # Vite 构建配置
└── README.md               # 项目文档
```

## 技术栈

- **构建工具**：Vite 5
- **编程语言**：TypeScript
- **UI 框架**：SolidJS
- **测试框架**：Vitest
- **Docker**：支持容器化部署

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License