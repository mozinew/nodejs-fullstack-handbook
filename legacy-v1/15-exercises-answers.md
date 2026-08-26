# 15 练习与参考答案

## 练习 1：空值

下面代码在 `pageSize` 为 0 时返回什么？如何修复？

```js
const size = input.pageSize || 20;
```

答案：返回 20，因为 0 是 falsy。若 0 是合法值，使用 `input.pageSize ?? 20`。

## 练习 2：异步循环

为什么下面函数可能在保存完成前返回？

```js
items.forEach(async item => await save(item));
return { success: true };
```

答案：`forEach` 不等待回调 Promise。串行用 `for...of`；并发用 `await Promise.all(items.map(save))`，生产中还要限制并发。

## 练习 3：流式假象

`findStream` 每批数据都 push 到 `allRecords`，是否解决内存问题？

答案：只解决单次拉取限制，最终仍保留全量数据。应在每批中完成转换/更新/输出，只保留必要摘要。

## 练习 4：类型安全

为什么 `invokeFunction<EopDashboardPayload>()` 不足以保证返回正确？

答案：泛型只影响编译器，不验证运行时 JSON。需要 unknown、类型守卫或 schema 验证；项目 dashboard API 已采用部分运行时验证。

## 练习 5：权限

前端传入 `ownerId`，服务端据此返回客户，风险是什么？

答案：攻击者可篡改 ownerId 越权读取。服务端应从 `context.user` 推导身份，或验证调用者是否允许代查目标 owner。

## 练习 6：幂等

“先查询重名，再创建”为什么仍可能重复？

答案：两个并发请求可同时查不到后同时创建。需要数据库唯一约束、幂等键或原子 upsert；查重只改善体验。

## 练习 7：递归组织链

查询上级直到为空还缺什么保护？

答案：visited Set 防循环、最大深度、批量查询、缺失节点处理和超时/记录限制。

## 练习 8：XSS

Showdown 输出直接传给 `dangerouslySetInnerHTML` 有何问题？

答案：不可信 Markdown 可能生成危险 HTML。服务端限制内容，前端用 DOMPurify 等白名单清洗，并配置 CSP；不要仅靠字符串替换。

## 练习 9：跨系统同步

CRM 已写成功但致远超时，应该回滚 CRM 吗？

答案：通常无法可靠跨系统回滚。记录待发送事件，按幂等键重试，失败入死信并对账补偿；业务若要求强一致需重新设计边界。

## 练习 10：React 竞态

快速切换筛选时旧响应覆盖新响应如何解决？

答案：请求序号只接受最新结果，或 AbortController 取消旧请求。项目 `useDashboardData` 已使用请求序号。

## 实战题

1. 为 `createCustomer` 抽出纯校验/映射函数，设计表驱动测试，但不改变外部契约。
2. 为 `streamQueryData` 设计对象名、字段名、操作符白名单和最大返回量。
3. 为 Agent 轮询加入 Failed/Cancelled、指数退避、总超时和卸载取消。
4. 为 Excel 导出加入容量限制、公式注入防护和临时文件清理。
5. 给致远同步设计 task/outbox 表、状态机、幂等键和对账作业。

评价标准：正确性 40%、测试 20%、安全 15%、可观测 10%、可维护 10%、说明 5%。

