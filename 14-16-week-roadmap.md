# 14 16 周学习与实战路线

每周 10–15 小时。每周固定产出：一页笔记、一组测试、一次源码讲解、一次 AI 复盘。验收必须以可运行结果或口述推演完成。

| 周 | 目标 | 项目阅读 | 编码与 AI 任务 | 验收 |
|---|---|---|---|---|
| 1 | JS 类型、函数、对象、作用域 | `createCustomer` 辅助函数 | 写参数 normalize/validate；AI 出边界用例 | 解释 undefined/null/falsy/引用 |
| 2 | 数组、Map/Set、模块、错误 | `getCRMUserByName` | 写用户去重和分组；比较 CJS/ESM | 不看资料完成数据转换 |
| 3 | Promise、事件循环、并发 | `agent_input` 轮询 | 写有限并发器和超时包装 | 预测事件循环输出，识别 async forEach |
| 4 | TypeScript | dashboard types/api | 把一个 JS DTO 类型化并运行时校验 | 区分 any/unknown/断言/守卫 |
| 5 | Node 核心 API、HTTP、Buffer | local-dev 两个 `.cjs` | 写 JSON HTTP client 和 Token cache 测试 | 能解释流、超时、模块缓存 |
| 6 | aPaaS 函数契约与 CRUD | customer/opportunity CRUD | 画 meta→handler→data 链路 | 能新增安全查询函数设计 |
| 7 | 查询操作符、流式、批量 | stream/batch 函数 | 将全量处理改写为逐批伪代码 | 解释背压、批次和幂等 |
| 8 | 用户、权限、层级 | user/leader/permission | 给递归上级算法加循环保护测试 | 能区分身份标识与授权 |
| 9 | 外部集成与一致性 | sync to/from Seeyon | 设计 Outbox、重试、对账 | 能处理跨系统部分失败 |
| 10 | React 与浏览器 | 两个 cascader | 写受控表单和 Testing Library 测试 | 解释 render/effect/cleanup |
| 11 | 全栈契约与可视化 | dashboard 全链路 | 为 v3 payload 写契约测试 | 能定位前端/网关/函数哪层错 |
| 12 | 安全与质量 | agent、Excel、通用动态查询 | AI 安全审查后人工复核 | 找出 XSS/越权/SSRF/资源风险 |
| 13 | NestJS 基础 | 对照客户 CRUD | 建 Controller/Service/Repository | 完成 DTO 校验和统一异常 |
| 14 | PostgreSQL/Prisma/Redis/队列 | 对照同步函数 | 实现事务、缓存和后台任务 | 测试重复消息和缓存失效 |
| 15 | 可观测与交付 | 选关键同步链路 | 加日志、指标、trace；Docker/CI | 用 dashboard/runbook 定位故障 |
| 16 | 毕业项目 | EOP 看板或同步链路 | 完成设计、实现、测试、部署说明 | 代码评审+故障演练+复盘 |

## 毕业项目建议

构建“客户/商机协同服务”：React 搜索与编辑页，NestJS API，PostgreSQL/Prisma，Redis 缓存，BullMQ 同步任务，aPaaS adapter，OIDC/JWT，OpenAPI 客户端，Jest/Vitest/Playwright，OpenTelemetry 与 Docker。

验收场景：重复提交不产生重复数据；外部系统超时后可重试；无权限用户被拒绝；旧客户端在一次兼容升级中仍工作；能从 trace 定位一次失败；数据库迁移可回滚或前向修复。

## 时间不够时的优先级

先完成 1–8、10–13 周。Kafka/Kubernetes 等只需理解边界，不要在没有真实规模问题时过度实践。当前项目的可维护性和安全性优先于追逐新框架。

