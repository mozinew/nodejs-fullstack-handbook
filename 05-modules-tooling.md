# 05 npm、模块系统与工程化

## CommonJS 与 ESM

```js
// CommonJS：云函数与 .cjs 网关
const axios = require('axios');
module.exports = async function handler() {};

// ESM：Vite/React/TypeScript
import { useState } from 'react';
export default function Component() {}
```

CommonJS 有 `require/module.exports/__dirname`；ESM 使用 `import/export/import.meta.url`，更利于静态分析。`vite.config.ts` 用 `createRequire(import.meta.url)` 加载 CJS，是本项目的互操作案例。注意 `exports = fn` 不会替换 `module.exports`。

## 包管理

- `dependencies` 是运行时依赖，`devDependencies` 是构建/检查工具。
- `npm ci` 严格按 lockfile 安装，适合 CI。
- 不要混用多套 lockfile；固定 Node 与包管理器版本。
- SemVer 为 `MAJOR.MINOR.PATCH`，升级要看破坏性变更和 Node 支持范围。

项目有 Node 14 遗留目录、Node 20 云函数、组件和 local-dev 四个依赖域，升级不能只看一个 `package.json`。

## 直接依赖地图

| 依赖 | 用途 |
|---|---|
| `@byted-apaas/*` | 数据、函数、运行时、连接器、组件 SDK |
| `axios` | HTTP 请求 |
| `xlsx` | Excel 读取与导出 |
| `dayjs` | 日期周期 |
| `react/react-dom` | React 17 UI/Portal |
| `antd/antd-mobile` | PC/移动 UI |
| `echarts` | 图表 |
| `showdown` | Markdown 转 HTML |
| `vite/typescript` | 本地构建和类型检查 |

源码中注释掉的 `linq` 不是当前直接依赖。

## 推荐工程基线

固定 Node 版本；TypeScript 开 strict；ESLint 查缺陷、Prettier 管格式；CI 执行 lockfile 安装、lint、typecheck、unit、integration、build、安全扫描。配置按环境注入，只提交 `.env.example`，不提交真实凭证。

