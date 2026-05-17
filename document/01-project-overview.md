# Ozida Workspace 项目总览

## 项目定位

Ozida Workspace 是一个基于 Obsidian 插件的个人 AI 工作平台。

第一阶段目标不是先接入复杂功能，而是先做出一个可以运行的 Obsidian Dashboard UI。后续再逐步接入：

- 网易企业邮箱邮件转 Markdown
- 本地 Python script
- Airtable 同步
- AI Assistant
- webhook / 会员验证
- 自动化 workflow

## 当前命名

- GitHub repo: `obsidian-ozida-workspace`
- Plugin ID: `ozida-workspace`
- Plugin Name: `Ozida Workspace`
- View Type: `ozida-workspace-view`

## 我们参考的两个插件

### ioto-update

学习重点不是 UI，而是底层逻辑：

- SettingsTab 设置页
- ServiceContainer 服务容器
- SettingsManager 设置管理
- ApiService 验证 API Key / Email
- Airtable records 转 Obsidian 文件
- GitHub/Gitee release 插件安装
- Templater 触发器临时关闭
- Vault 文件写入

一句话：`ioto-update` 是一个 Airtable 驱动的权限验证 + 文件分发/更新器。

### apex-dashboard

学习重点是 UI 工作台：

- Dashboard 页面
- 卡片布局
- Sidebar
- Banner
- 最近文档
- Quick Links
- CSS 变量主题
- Markdown 文件作为 Dashboard 数据源

一句话：`apex-dashboard` 更适合学习 Obsidian Dashboard 的界面组织方式。

## Ozida Workspace 的融合方向

Ozida Workspace 应该吸收两者：

```text
apex-dashboard 的 UI 工作台思想
+
ioto-update 的 service / sync / auth 底层逻辑
=
Ozida Workspace
```

## 第一阶段完成标准

v0.1 只做 UI 壳：

- 左侧 Ribbon 图标
- 自定义 ItemView
- 经典三栏式 UI
- 左栏 Navigation
- 中栏 Workspace
- 右栏 AI Copilot
- 所有按钮暂时只是 placeholder Notice

不要在第一阶段接入：

- Airtable
- webhook
- Python
- AI API
- 邮件导入
- 数据同步
