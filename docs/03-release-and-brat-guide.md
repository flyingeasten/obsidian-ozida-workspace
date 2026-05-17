# BRAT 与 Release 发布指南

## BRAT 是什么

BRAT（Beta Reviewer's Auto-update Tool）可以让未上架 Obsidian 官方插件市场的插件，直接通过 GitHub 仓库安装。

BRAT 安装插件时，本质上会寻找：

```text
main.js
manifest.json
styles.css
```

这三个文件。

---

## Obsidian 插件运行三件套

### main.js

打包后的插件运行文件。

来源：

```text
src/*.ts
  ↓ npm run build
main.js
```

### manifest.json

插件身份证。

### styles.css

插件 UI 样式。

---

## 当前 Ozida Workspace 已满足 BRAT 条件

当前 repo 根目录已经存在：

```text
main.js
manifest.json
styles.css
```

因此已经可以：

- 本地安装
- BRAT 安装
- GitHub Release 发布

---

## GitHub Release 推荐方式

推荐每次发布一个版本：

```text
v0.1.0
v0.1.1
v0.2.0
```

manifest.json 中的 version 应与 release tag 保持一致。

例如：

```json
{
  "version": "0.1.0"
}
```

对应：

```text
v0.1.0
```

---

## Release 创建步骤

GitHub：

```text
Releases
→ Draft a new release
```

填写：

### Tag

```text
v0.1.0
```

### Release title

```text
Ozida Workspace v0.1.0
```

### 上传附件

上传：

```text
main.js
manifest.json
styles.css
```

最后：

```text
Publish release
```

---

## BRAT 安装方法

Obsidian：

```text
Settings
→ BRAT
→ Add Beta plugin
```

填入仓库地址：

```text
https://github.com/flyingeasten/obsidian-ozida-workspace
```

BRAT 会安装到：

```text
.obsidian/plugins/ozida-workspace/
```

然后在 Community Plugins 中启用插件。

---

## 未来优化方向

后续可以加入：

- GitHub Actions 自动 build
- GitHub Actions 自动 release
- 自动上传 main.js / manifest.json / styles.css
- 自动版本号管理

但当前阶段：

```text
手动 build + 手动 release
已经足够
```
