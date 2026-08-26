# 12 NestJS 企业级 Node.js 生态

## 推荐技术栈

| 层 | 推荐 | 作用 |
|---|---|---|
| Runtime | 当前项目 Node 20；新服务采用受支持 LTS | 服务运行基础 |
| 语言 | TypeScript strict | 类型与可维护性 |
| 包管理/仓库 | pnpm workspace + Turborepo（需要多包时） | 依赖与任务编排 |
| Web | NestJS + Fastify adapter | 企业结构与高效 HTTP |
| 契约 | REST + OpenAPI；内部事件用 AsyncAPI | 文档、生成客户端、治理 |
| 校验 | class-validator/class-transformer 或 Zod | 运行时边界 |
| 数据库 | PostgreSQL + Prisma | 关系数据、事务、迁移 |
| 缓存 | Redis | 缓存、锁、限流、短期状态 |
| 异步任务 | BullMQ；跨系统 Kafka/RabbitMQ | 重试、削峰、事件集成 |
| 鉴权 | OAuth2/OIDC、JWT、Passport | 身份与访问控制 |
| 测试 | Jest、Supertest、Testcontainers | 单元与真实依赖集成 |
| 日志/链路 | Pino + OpenTelemetry | 结构化日志和追踪 |
| 指标/错误 | Prometheus/Grafana + Sentry | 监控和异常聚合 |
| 交付 | Docker、Kubernetes、GitHub Actions/GitLab CI | 可重复部署 |

具体选型服从公司基础设施，避免为了“生态完整”一次引入全部组件。

## Spring Boot → NestJS

| Spring | NestJS | 说明 |
|---|---|---|
| `@SpringBootApplication` / Configuration | `@Module` | 模块边界与 providers |
| `@RestController` | `@Controller` | HTTP 路由 |
| `@Service` / Bean | `@Injectable` / Provider | 依赖注入 |
| Filter | Middleware / Guard | 通用预处理或授权 |
| HandlerInterceptor | Interceptor | 调用前后、转换、计时 |
| `@ControllerAdvice` | Exception Filter | 统一错误响应 |
| Bean Validation | Pipe + validator | 参数转换与校验 |
| Spring Data | Prisma Repository/Service | 数据访问 |
| Actuator/Micrometer | Terminus/OpenTelemetry/Prometheus | 健康与指标 |

## 分层与依赖方向

```text
HTTP Controller / Queue Consumer
            ↓
      Application Use Case
            ↓
 Domain policy ← ports/interfaces
            ↑
Prisma / Redis / aPaaS / HTTP adapters
```

Controller 只做协议转换；Use Case 编排业务；Domain 表达规则；Adapter 处理技术细节。不要让 Prisma model、aPaaS record 或 HTTP response 穿透所有层。

## 推荐目录

```text
apps/api/src/
  modules/customer/
    customer.controller.ts
    customer.service.ts
    customer.repository.ts
    dto/
  infrastructure/
    prisma/ redis/ messaging/ observability/
  common/
    auth/ errors/ validation/
packages/
  contracts/ eslint-config/ tsconfig/
```

## 数据与事务

PostgreSQL 负责强一致关系数据；Prisma migration 必须评审、备份、前后兼容。跨服务不用数据库事务硬绑，采用 Outbox/Saga。Redis 缓存定义 key、TTL、失效策略和雪崩/穿透保护；分布式锁只能在明确场景使用。

## API 设计

- 资源名词化，正确使用状态码；列表统一 pagination/filter/sort。
- DTO 与领域对象分离；错误响应含 code、message、requestId、details。
- 版本演进优先向后兼容；破坏性变化使用版本号和废弃窗口。
- POST 幂等可接受 `Idempotency-Key`。
- OpenAPI 在 CI 校验 breaking change，并生成前端客户端类型。

## 消息与任务

BullMQ 适合同一系统的后台作业；Kafka 适合事件流和高吞吐；RabbitMQ 适合路由和可靠队列。消费者必须幂等，明确 ack、重试、退避、死信、顺序和消息 schema。不要承诺 exactly-once；设计 at-least-once 下的正确性。

## 交付路径

开发提交 → lint/typecheck/test → 构建不可变镜像 → 漏洞扫描 → 测试环境迁移与冒烟 → 灰度/金丝雀 → 指标门禁 → 全量 → 可回滚。数据库变更使用 expand-and-contract，先兼容新旧字段再删除旧结构。

## 从当前项目演进

不必把 aPaaS 全部迁走。可先抽出纯函数、DTO、错误模型和外部适配器；为关键同步增加任务表与幂等；将复杂跨系统编排放入 NestJS 服务，aPaaS 继续承担页面、数据对象和轻量触发器。

