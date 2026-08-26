# 16 术语表、参考资料与能力清单

## 术语

| 术语 | 含义 |
|---|---|
| Event Loop | 调度 JS、定时器和 I/O 回调的循环机制 |
| Microtask | Promise 回调等，在当前阶段结束后优先清空 |
| Closure | 函数捕获定义环境变量 |
| Backpressure | 消费速度跟不上生产速度时的流量控制 |
| Idempotency | 同一请求重复执行仍保持期望结果 |
| DTO | 跨边界传输的数据形状，不等于领域实体 |
| CJS / ESM | CommonJS 与 ECMAScript Modules |
| SSRF / XSS | 服务端请求伪造 / 跨站脚本攻击 |
| Outbox | 与业务事务一起记录待发送事件，再异步投递 |
| Trace | 一次请求跨服务调用的链路记录 |
| p95 | 95% 请求耗时不超过该值 |
| HMR | 开发时模块热更新 |

## 官方资料

- [Node.js Learn](https://nodejs.org/en/learn)
- [Node.js API](https://nodejs.org/api/)
- [MDN JavaScript Guide](https://developer.mozilla.org/docs/Web/JavaScript/Guide)
- [ECMAScript specification](https://tc39.es/ecma262/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Learn](https://react.dev/learn)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Fastify Documentation](https://fastify.dev/docs/latest/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
- [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- 飞书 aPaaS：优先使用企业当前平台版本对应的官方帮助中心、SDK typings 和控制台示例；平台私有 API 以实际运行时声明为准。

## L1 JavaScript 入门检查

- [ ] 能解释类型转换、严格相等、引用、闭包、原型和 this。
- [ ] 能正确使用数组方法、Map/Set、解构、可选链和空值合并。
- [ ] 能解释 Promise、async/await、事件循环与并发限制。
- [ ] 能独立调试一个 Node 脚本。

## L2 当前项目掌握检查

- [ ] 能从组件调用追到 meta、云函数、数据对象/连接器和返回映射。
- [ ] 能解释 aPaaS 人员、关联、枚举和多值字段。
- [ ] 能选择 find、findStream、batchUpdate 或长任务。
- [ ] 能处理环境、权限、日志、部分失败和外部调用。
- [ ] 能在 local-dev 定位浏览器、网关、云端或契约故障。

## L3 独立全栈检查

- [ ] 能用 React + TypeScript 构建有加载/空/错状态的页面。
- [ ] 能用 NestJS 设计模块、DTO、服务、仓储和异常模型。
- [ ] 能设计 PostgreSQL 事务、Redis 缓存和后台任务。
- [ ] 有单元、集成、契约、组件和 E2E 测试策略。
- [ ] 能设计鉴权、幂等、限流、迁移和 CI/CD。

## L4 企业级架构检查

- [ ] 能用 SLO、指标、日志和 trace 解释线上健康度。
- [ ] 能处理容量、降级、重试风暴、数据对账与灾难恢复。
- [ ] 能评审 API/事件契约演进和数据库零停机迁移。
- [ ] 能做威胁建模、供应链治理和事故复盘。
- [ ] 能说明何时不应使用 Node.js 或不应拆微服务。

## 版本与学习建议

当前项目以 Node.js 20、React 17、TypeScript 5.5、Vite 4 为实际基线。学习现代 API 时先核对部署支持，不为追新破坏平台兼容。官方文档优先于博客；源码和可重复实验优先于记忆结论。

