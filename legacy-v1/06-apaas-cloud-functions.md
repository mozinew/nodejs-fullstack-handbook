# 06 飞书 aPaaS 云函数开发

## 函数契约

```js
module.exports = async function (params = {}, context, logger) {
  logger.info('start');
  try {
    validate(params);
    return { success: true, data: await execute(params, context) };
  } catch (error) {
    logger.error('failed', { message: error?.message });
    return { success: false, errorCode: 'INTERNAL_ERROR', message: '处理失败' };
  }
};
```

- `params`：调用输入，不可信，必须校验、归一化。
- `context`：用户、租户、请求头、数据库等运行上下文，能力依平台而异。
- `logger`：结构化记录阶段、关联 ID、耗时和错误；避免敏感数据。
- `index.meta.json`：API 名、标签、输入输出、是否前端可调、是否长任务。元数据与代码契约必须同步。

项目同时使用全局 `application` 和 `context.db`。新代码应通过薄适配层统一数据对象获取，便于测试，而不是到处判断运行环境。

## 数据 API

项目常见链式查询：

```js
const rows = await application.data.object('opportunity')
  .select('_id', 'name', 'owner')
  .where({ owner: { _id: ownerId } })
  .orderByDesc('_updatedAt')
  .limit(100)
  .find();
```

已使用操作包括 `select/where/limit/offset/orderBy/orderByDesc/find/findOne/findStream/create/update/batchCreate/batchUpdate`。已使用查询操作符包括 `in/notIn/and/or/gt/gte/lt/lte/empty/notEmpty/contain/notContain/hasAnyOf/hasNoneOf/neq`。

务必理解字段形态：普通字段是标量；人员、关联、多选常是 `{ _id }` 或其数组；枚举写入的可能是 option API 值而不是中文标签。先查 metadata，再做显式映射。

## 流式与长任务

`findStream` 解决单次读取限制，长任务解决执行时长限制，两者不是一回事。安全模板：

```js
let processed = 0;
await object.select(...fields).where(filter).findStream(async batch => {
  const updates = batch.map(toUpdate).filter(Boolean);
  if (updates.length) await object.batchUpdate(updates);
  processed += batch.length;
  logger.info('batch done', { processed });
});
return { processed };
```

长任务不要依赖同步返回业务结果；调用方应获取任务状态或由后续事件通知。设计断点、幂等、失败清单和可重跑边界。

## 平台能力地图

| 能力 | 项目用法 |
|---|---|
| `application.data` / `context.db` | 业务对象和 `_user` 查询、创建、更新、流式处理 |
| `application.operator` | 组合筛选条件 |
| `application.metadata` | 查询对象字段和枚举信息 |
| `application.globalVar` | 环境标记、EOP API Key 等服务端配置 |
| `application.resources.file` | 上传生成的 Excel |
| `faas.function(...).invoke` | 函数间编排 |
| `connector.http_client` | HTTP 集成 |
| `connector.mysql` | 致远/维表数据查询 |
| `connector.contact` | 飞书通讯录能力 |
| `application.flow/integration` | 流程和集成能力的项目入口 |

## 前端调用、权限和安全

`frontendSDKInvokable: true` 只代表可被浏览器调用，不代表已授权。服务端必须根据 `context.user`、租户和业务数据再次鉴权，绝不能相信前端传入的 userId 或 ownerId。区分登录用户、飞书 open_id、CRM `_user._id`、邮箱和员工号，它们不可互换。

返回值避免把 `_unauthFields`、内部配置或底层错误直接暴露给前端。外部 HTTP 目标应固定域名或白名单，防止 SSRF；Token 和 API Key只存在服务端全局变量。

## 一致性与可靠性

跨 aPaaS 数据库、MySQL、飞书和致远没有天然分布式事务。推荐采用：本地状态/Outbox → 异步发送 → 幂等键 → 重试与死信 → 对账补偿。至少记录 source、业务键、目标系统、attempt、status、lastError、updatedAt。

## 生产函数检查表

- 元数据和实现输入输出一致，必要字段在运行时校验。
- 权限在服务端校验；日志已脱敏。
- 查询只 select 必要字段，有分页/流式上限。
- 批量操作有并发限制、幂等、部分失败结果。
- 外部调用有超时、重试分类和状态码检查。
- 环境变量缺失时快速失败，不静默访问生产对象。
- 枚举/API 名不散落硬编码，变更可追踪。
- 有单元、契约、集成测试和可观测指标。

