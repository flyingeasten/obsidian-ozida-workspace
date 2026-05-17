# Obsidian 插件架构学习笔记

## Obsidian 插件三件套

一个 Obsidian 插件运行最核心的三个文件：

```text
main.js
manifest.json
styles.css
```

### manifest.json

插件身份证。

告诉 Obsidian：

- 插件 ID
- 插件名字
- 版本号
- 最低 Obsidian 版本
- 作者信息

当前配置：

```json
{
  "id": "ozida-workspace",
  "name": "Ozida Workspace",
  "version": "0.1.0"
}
```

### main.js

真正运行的插件代码。

来源：

```text
src/*.ts
  ↓ esbuild
main.js
```

Obsidian 实际运行的是 main.js。

### styles.css

控制插件 UI 样式。

Obsidian 会自动加载插件目录里的 styles.css。

---

## 插件入口：main.ts

典型结构：

```ts
export default class MyPlugin extends Plugin {
  async onload() {
    // 插件启动
  }

  async onunload() {
    // 插件关闭
  }
}
```

理解：

```text
onload = 开机
onunload = 关机
```

---

## 什么是 ItemView

ItemView 可以理解成：

```text
Obsidian 中的一个自定义页面
```

例如：

- Markdown 页面
- Canvas
- Graph View
- 都是 View

Ozida Workspace Dashboard 也是一个自定义 View。

当前 View Type：

```text
ozida-workspace-view
```

main.ts 中会注册：

```ts
this.registerView(
  OZIDA_DASHBOARD_VIEW_TYPE,
  (leaf) => new OzidaDashboardView(leaf)
)
```

含义：

```text
如果有人打开 ozida-workspace-view
就创建 OzidaDashboardView
```

---

## Dashboard 三栏式 UI

当前结构：

```text
左栏：Navigation
中栏：Workspace
右栏：AI Copilot
```

CSS Grid：

```css
.ozida-shell {
  display: grid;
  grid-template-columns:
    minmax(180px, 220px)
    minmax(320px, 1fr)
    minmax(240px, 300px);
}
```

含义：

```text
左栏固定宽度
中栏自动填满
右栏固定宽度
```

---

## Dashboard 渲染流程

当前逻辑：

```text
manifest.json
  ↓
Obsidian 加载插件
  ↓
main.ts onload()
  ↓
registerView()
  ↓
addRibbonIcon()
  ↓
点击图标
  ↓
activateDashboardView()
  ↓
OzidaDashboardView.onOpen()
  ↓
创建左栏 / 中栏 / 右栏 DOM
  ↓
styles.css 渲染 UI
```

---

## 当前阶段不要碰的内容

先不要接入：

- Airtable
- webhook
- AI API
- Python script
- Email Import
- 同步逻辑

当前目标只有一个：

```text
真正看懂一个 Obsidian Dashboard 插件是怎么生成出来的
```
