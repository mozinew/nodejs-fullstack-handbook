# CRM 毕业项目

## 用户旅程

销售创建客户并提交商机；系统检查权限和幂等，持久化业务数据与 Outbox；Worker 同步外部系统；经营看板展示经过契约验证的数据；所有调用可由 requestId 追踪。

## 必备架构

```text
React 19 → OpenAPI client → NestJS/Fastify
                         → PostgreSQL + Outbox
                         → Redis/BullMQ → aPaaS/致远 adapter
                         → Pino + OpenTelemetry + Prometheus
```

## 验收

- 重复 `Idempotency-Key` 不创建第二条记录。
- viewer 无法写，sales 只能访问授权范围。
- 外部超时进入重试，达到上限进入死信且可重放。
- 日志不含 Token，错误响应含 requestId。
- migration 使用 expand-and-contract，有恢复说明。
- 单元、集成、契约、组件、E2E 测试均存在。

`readiness.mjs` 和测试提供发布门禁的最小可执行模型；学生需要继续实现真实前后端和基础设施。
