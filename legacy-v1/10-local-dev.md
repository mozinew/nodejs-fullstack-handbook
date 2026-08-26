# 10 本地调试、Vite 与 SDK 适配

## 当前架构

```text
浏览器 React 组件
  → @byted-apaas/client-sdk/function（被 Vite alias 替换）
  → POST /api/local-functions/:functionName
  → Vite 中间件
  ├─ 有凭证：aPaaS OpenAPI → 云端真实函数
  └─ 无凭证：function-runner.cjs → 本地 require 函数
```

有凭证时更接近真实平台；无凭证模式只模拟 `application.globalVar` 和基本 context，无法完整模拟数据库与连接器。

## Vite 知识点

- `defineConfig/loadEnv`：按 mode 读取环境配置。
- plugin `configureServer`：给开发服务器挂中间件。
- `resolve.alias`：把平台 SDK 替换成本地适配器，并确保组件使用同一 React 实例。
- transform 插件：把组件内 `require('echarts')` 转为 ESM import。
- HMR：组件和 meta 修改快速反馈。

## Node 网关知识点

`function-runner.cjs` 使用路径白名单正则、`path.join`、`fs.existsSync`、`require.cache` 失效并构造 context/logger。`apaas-openapi.cjs` 使用 http/https、Buffer、JSON 解析、超时、状态码检查、Token 缓存和 URL 编码。

## 调试顺序

1. 浏览器 Network：请求是否发出、状态码和响应结构。
2. Vite 网关日志：路由、函数名、错误层次。
3. 云函数日志：输入摘要、阶段、耗时、外部调用。
4. 平台权限：凭证是否授权目标函数和环境。
5. 契约：meta、云函数返回、前端 mapper 是否一致。

## 本地启动

```bash
cd package_22de35__c/local-dev
cp .env.local.example .env.local
npm ci
npm run dev
```

真实凭证只放被 Git 忽略的 `.env.local`。默认端口 5173；OpenAPI 单凭证限制 15 QPS，本地快速刷新和轮询也要受控。

## 建议增强

- 给远程调用增加 requestId、耗时、AbortSignal 和响应大小限制。
- Token 缓存处理并发刷新，避免多个请求同时换 Token。
- 本地 mock 明确标记“不支持的数据/连接器能力”，不要静默返回假成功。
- 用契约 fixture 复现生产响应，组件测试不必每次访问云端。

