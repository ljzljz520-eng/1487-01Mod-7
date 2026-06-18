# Solid Web Components UI

这是一个基于 Vite + TypeScript + SolidJS 构建的 **真正 Web Component** UI 组件库。组件遵循 W3C Custom Elements 标准，**不绑定任何框架**，可在 React、Vue、Solid、Angular 或纯 HTML 中直接使用。

## 项目特点

- ✅ 基于 Vite + TypeScript 构建
- ✅ **真正的 Web Component**（`<ui-button>`、`<ui-data-card>` 原生标签）
- ✅ 跨框架通用：React / Vue / Solid / HTML 零额外依赖
- ✅ 专为 SolidJS 项目优化的原生 JSX 组件导出
- ✅ 支持一键 Docker 部署
- ✅ 完整的测试覆盖
- ✅ 提供详细的开发文档和跨框架示例

## 已实现组件

| 组件标签 | Solid 导出 | 说明 |
|---------|-----------|------|
| `<ui-button>` | `Button` | 按钮组件，支持 variant / size / disabled |
| `<ui-data-card>` | `DataCard` | 数据卡片，支持传复杂对象和数组 |

## Web Component 公共 API（所有框架通用）

> ⚠️ 我们**不会为了适配某个框架而改变 Web Component 的公共 API**。所有框架使用的都是下面同一套 DOM 接口。

### 属性（Attributes，用于简单值）

| 属性 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | 按钮变体（ui-button） |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸（ui-button） |
| `disabled` | `boolean` | `false` | 是否禁用（ui-button） |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题（ui-data-card） |

### 属性（DOM Properties，用于复杂值——对象/数组）

这些值无法用 HTML attribute 传递，必须设置为 DOM 节点 property：

- **`user`** `UserData`：`{ id, name, email, tags: string[], meta: Record<string, unknown> }`
- **`actions`** `Array<{ label: string; type: 'primary' | 'secondary' }>`

### 事件（Custom Events）

所有事件都是 `bubbles: true, composed: true` 的 CustomEvent：

| 事件名 | Detail 数据 | 触发组件 |
|-------|------------|---------|
| `ui-click` | `{ originalEvent: MouseEvent }` | `<ui-button>` |
| `ui-action` | `{ type: string; user?: UserData }` | `<ui-data-card>` |

> **设计原则**：所有自定义事件加 `ui-` 前缀，避免与原生事件名冲突；所有数据通过 `event.detail` 传出。

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

## 跨框架使用指南

> 所有示例代码位于 [`examples/`](file:///Users/kkcarrot/solo/1487/1487-01Mod-7/examples) 目录。每个框架的示例都展示了三件事：
> 1. **注册组件**（一般通过 `import 'solid-web-components-ui'` side-effect import 完成）
> 2. **监听事件**（通过 `addEventListener` 读取 `event.detail`）
> 3. **传复杂属性**（通过设置 DOM property，而不是 HTML attribute）

---

### 1. React 中使用

React 19 对 Web Components 有更好的支持；React 18 及以下需要注意自定义事件要用 `addEventListener` 手动绑定（`onUiClick` 写法无效）。

完整示例：[examples/react/ReactWrapper.tsx](file:///Users/kkcarrot/solo/1487/1487-01Mod-7/examples/react/ReactWrapper.tsx)

```tsx
import React, { useEffect, useRef } from 'react';
// ✅ 注册：导入即触发 customElements.define（side-effect import）
import 'solid-web-components-ui';

export default function App() {
  const btnRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const card = cardRef.current;

    // ✅ 监听事件：addEventListener，读 event.detail
    const onClick = (e: Event) =>
      console.log('按钮点击', (e as CustomEvent).detail.originalEvent);
    const onAction = (e: Event) =>
      console.log('卡片操作', (e as CustomEvent).detail.type);

    btn?.addEventListener('ui-click', onClick);
    card?.addEventListener('ui-action', onAction);

    // ✅ 传复杂属性：设置 DOM property
    if (card) {
      card.user = { id: 1, name: '张三', email: 'a@b.com', tags: ['管理员'] };
      card.actions = [{ label: '查看', type: 'primary' }];
    }

    return () => {
      btn?.removeEventListener('ui-click', onClick);
      card?.removeEventListener('ui-action', onAction);
    };
  }, []);

  return (
    <>
      {/* 简单属性直接用 attribute */}
      <ui-button ref={btnRef} variant="primary" size="medium">
        React 中使用
      </ui-button>
      <ui-data-card ref={cardRef} theme="light" />
    </>
  );
}
```

> **React 关键要点**：
> - 自定义事件（`ui-click`）**不能**写为 `onUiClick={...}`，必须用 `addEventListener`
> - 复杂属性（对象/数组）必须在 `useEffect` 中通过 `ref.current.xxx = value` 设置
> - 别忘了在 `useEffect` 的 cleanup 中解绑事件，避免内存泄漏

---

### 2. Vue 中使用

Vue 对 Web Components 的支持是所有框架中最友好的：`v-bind`、`@event`、`ref` 全都可以直接用。

完整示例：[examples/vue/VueWrapper.vue](file:///Users/kkcarrot/solo/1487/1487-01Mod-7/examples/vue/VueWrapper.vue)

```vue
<template>
  <!-- ✅ 简单属性用 attribute + v-bind；✅ 事件直接 @ui-click -->
  <ui-button variant="primary" size="medium" @ui-click="onBtnClick">
    Vue 中使用
  </ui-button>

  <!-- ✅ 传复杂属性：在 onMounted 中通过 ref 设置 property -->
  <ui-data-card ref="cardRef" :theme="theme" @ui-action="onCardAction" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// ✅ 注册：side-effect import
import 'solid-web-components-ui';

const cardRef = ref<HTMLElement | null>(null);
const theme = ref<'light' | 'dark'>('light');

const userData = { id: 1, name: '张三', email: 'a@b.com', tags: ['管理员'] };
const actions = [{ label: '查看', type: 'primary' }];

const onBtnClick = (e: Event) =>
  console.log('按钮点击', (e as CustomEvent).detail.originalEvent);
const onCardAction = (e: Event) =>
  console.log('卡片操作', (e as CustomEvent).detail.type);

// ✅ 传复杂属性：DOM property
onMounted(() => {
  if (cardRef.value) {
    cardRef.value.user = userData;
    cardRef.value.actions = actions;
  }
});
</script>
```

> **Vue 关键要点**：
> - `@ui-click` 写法完美支持，不需要 `addEventListener`
> - 如果使用 Vite + Vue，需要在 `vite.config.ts` 中告诉 Vue 编译器把 `ui-*` 当作自定义元素：
>   ```ts
>   export default defineConfig({
>     plugins: [vue({ template: { compilerOptions: { isCustomElement: (t) => t.startsWith('ui-') } } })],
>   });
>   ```

---

### 3. Solid 中使用

Solid 本身就是本库的原生环境。可以**二选一**：

- **方式 A（推荐，Solid 内部使用）**：直接 import `Button` / `DataCard` 当普通 Solid 组件，props、children、onClick 全部自然传递
- **方式 B（跨场景/微前端）**：用 `<ui-button>` Web Component 标签，和其他框架走同一套公共 API

完整示例：[examples/solid/SolidWrapper.tsx](file:///Users/kkcarrot/solo/1487/1487-01Mod-7/examples/solid/SolidWrapper.tsx)

```tsx
import { Component, onMount, onCleanup } from 'solid-js';
// ✅ 方式 A：原生 Solid 组件
import { Button, DataCard } from 'solid-web-components-ui';
// ✅ 方式 B：注册 Web Component 标签
import 'solid-web-components-ui';

const App: Component = () => {
  let btnEl: HTMLElement | undefined;

  // 方式 A：原生 Solid（传值/事件最自然）
  const nativeWay = () => (
    <>
      <Button variant="primary" onClick={() => console.log('click')}>
        原生 Solid 按钮
      </Button>
      <DataCard
        user={{ id: 1, name: '张三', email: 'a@b.com' }}
        onAction={(p) => console.log(p.type)}
      />
    </>
  );

  // 方式 B：Web Component（和 React/Vue/HTML 同一套 API）
  const wcWay = () => {
    const onClick = (e: Event) => console.log((e as CustomEvent).detail);
    onMount(() => btnEl?.addEventListener('ui-click', onClick));
    onCleanup(() => btnEl?.removeEventListener('ui-click', onClick));

    return <ui-button ref={btnEl} variant="primary">Web Component 按钮</ui-button>;
  };

  return <>{nativeWay()}{wcWay()}</>;
};
```

---

### 4. 普通 HTML (Vanilla JS) 中使用

完整示例：[examples/html/index.html](file:///Users/kkcarrot/solo/1487/1487-01Mod-7/examples/html/index.html)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 如果 dist 在本地：用 importmap 映射包名到文件路径 -->
  <script type="importmap">
    { "imports": { "solid-web-components-ui": "./dist/solid-web-components-ui.es.js" } }
  </script>
  <!-- 或者使用 CDN 发布后的真实路径 -->
</head>
<body>
  <ui-button id="btn" variant="primary">原生 HTML 按钮</ui-button>
  <ui-data-card id="card" theme="light"></ui-data-card>

  <script type="module">
    // ✅ 注册：side-effect import
    import 'solid-web-components-ui';

    // ✅ 监听事件
    document.getElementById('btn')!
      .addEventListener('ui-click', (e) =>
        console.log('点击', (e as CustomEvent).detail));

    // ✅ 传复杂属性：DOM property（注意不是 setAttribute）
    const card = document.getElementById('card')!;
    card.user = { id: 1, name: '张三', email: 'a@b.com', tags: ['管理员'] };
    card.actions = [{ label: '查看', type: 'primary' }];
    card.addEventListener('ui-action', (e) => console.log((e as CustomEvent).detail));
  </script>
</body>
</html>
```

> **HTML 关键要点**：
> - 一定要用 `<script type="module">`，不能用普通 `<script>`
> - 复杂属性**一定是 property**（`el.user = xxx`），**不是 attribute**（不能 `setAttribute('user', JSON.stringify(...))`）
> - 事件必须用 `addEventListener`，无法在 HTML 中写 `onui-click="..."`

---

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
│   │   ├── Button.tsx      # 按钮组件（同时导出 Solid 组件 & Web Component）
│   │   ├── DataCard.tsx    # 数据卡片组件（演示复杂属性 & 自定义事件）
│   │   └── __tests__/      # 测试文件目录
│   │       └── Button.test.tsx  # 按钮组件测试
│   └── index.ts            # 入口文件
├── examples/               # 跨框架示例
│   ├── react/ReactWrapper.tsx
│   ├── vue/VueWrapper.vue
│   ├── solid/SolidWrapper.tsx
│   └── html/index.html
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