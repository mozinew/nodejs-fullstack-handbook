# 11 测试、性能、安全和可观测性

## 测试金字塔

| 层级 | 工具 | 本项目优先对象 |
|---|---|---|
| 静态 | TypeScript、ESLint | DTO、空值、未处理 Promise、危险语法 |
| 单元 | Jest/Vitest | normalize、validate、mapper、日期、分组 |
| 契约 | JSON Schema/Zod、fixture | 云函数 meta 与实际返回、EOP v3 |
| 集成 | Jest、Supertest、Testcontainers | 数据仓储、HTTP/MySQL/Redis 适配器 |
| 组件 | Vitest、Testing Library | 加载/错误/空态、轮询、级联选择 |
| E2E | Playwright | 用户操作→云函数→展示 |

优先测试纯函数，再通过依赖注入隔离平台对象。测试正常、边界、非法输入、依赖失败、超时、重复请求和部分失败。

## 云函数可测试结构

```js
function createHandler({ customerRepository, clock }) {
  return async (params, context, logger) => {
    const input = validateCustomer(params);
    return customerRepository.create({ ...input, createdAt: clock.now() });
  };
}
```

生产组装传 aPaaS repository，单测传内存 fake。Mock 用于验证交互，fake 用于模拟行为；不要把平台 SDK 的内部实现复制进测试。

## 性能

先度量，再优化。核心指标是延迟分位数 p50/p95/p99、吞吐、错误率、外部依赖耗时、事件循环延迟、内存和 GC。

常见问题：N+1 查询、无界 find、全量数组聚合、串行独立请求、无上限 Promise.all、重复 metadata 查询、大 JSON 日志、图表重复初始化。优化顺序通常是减少数据量和往返次数，再做批量/缓存/并发，最后才做微观语法优化。

## 安全

- 注入：SQL 必须参数化；动态对象名/字段名使用白名单。
- XSS：Showdown 输出在 `dangerouslySetInnerHTML` 前清洗。
- SSRF：固定外部域名、协议和端口，限制重定向。
- 越权：前端可调用函数按 `context.user` 检查对象级权限。
- 敏感信息：Token、API Key、个人信息不进入前端和日志。
- Excel 注入：以 `= + - @` 开头的用户文本需转义。
- DoS：限制 body、数组、字段、分页、响应和超时。
- 供应链：锁版本、扫描漏洞、最小依赖、审查安装脚本。

## 可观测性

日志字段建议：timestamp、level、service/function、requestId、tenantId、actorIdHash、operation、durationMs、recordCount、errorCode。不要记录原始 Token、完整邮箱/手机号或全量业务对象。

指标采用 RED：Rate、Errors、Duration；资源采用 USE：Utilization、Saturation、Errors。跨 React→网关→云函数→连接器传播 traceId，用 OpenTelemetry 串联调用。

告警必须可行动，例如“同步失败率 10 分钟超过 2% 且样本大于 50”，并链接 runbook：影响、确认方式、止损、恢复、补数、复盘。

## 代码审查清单

- 输入、身份、权限、契约是否明确？
- 空值、时区、枚举、多值字段是否覆盖？
- Promise 是否全部等待，定时器/资源是否清理？
- 查询是否有界，批量是否限并发？
- 写操作是否幂等、可审计、可补偿？
- 错误是否分类，日志是否脱敏？
- 测试是否能让一次真实回归失败？

