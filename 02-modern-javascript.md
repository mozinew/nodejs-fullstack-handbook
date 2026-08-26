# 02 ES 标准与现代 JavaScript

## 项目高频语法

- 解构：`const { objectName, fieldNames = [] } = params`。
- 展开：浅复制、合并、可变参数，如 `operator.in(...ids)`。
- 模板字符串：日志与错误信息；禁止用它拼接 SQL。
- `?.` 与 `??`：处理外部系统缺失字段。
- `map/filter/reduce`：转换、筛选、聚合。
- Map/Set：按键分组、去重、快速查找。
- `for...of`：需要 await、break 或 continue 的流程。

```js
const uniqueIds = [...new Set(records.map(r => r.owner?._id).filter(Boolean))];
const byRegion = records.reduce((map, row) => {
  const key = row.region ?? 'unknown';
  map.set(key, [...(map.get(key) ?? []), row]);
  return map;
}, new Map());
```

这些模式用于人员去重、领导链递归、日报分组、看板聚合和批量同步。

## Promise、async/await 与并发

`async` 函数总返回 Promise；`await` 只暂停当前函数，不阻塞 Node 进程。

```js
const [users, accounts] = await Promise.all([loadUsers(), loadAccounts()]);

for (let i = 0; i < ids.length; i += 20) {
  await Promise.all(ids.slice(i, i + 20).map(loadOne));
}
```

不要使用 `items.forEach(async item => ...)` 后立即返回。需要顺序执行用 `for...of`；全部成功才继续用 `Promise.all`；允许部分失败用 `Promise.allSettled`。并发必须受 QPS、连接数、超时和平台配额约束。

## 事件循环

粗略顺序：当前调用栈 → Promise 微任务 → 定时器/I/O 阶段。CPU 密集循环会阻塞所有请求，大量微任务也会造成饥饿。

```js
console.log('A');
setTimeout(() => console.log('D'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('B'); // A B C D
```

云函数的大数据应使用流式/批次/长任务；React 轮询必须在卸载时 `clearInterval`。

## 不可变更新、日期与 JSON

对象展开是浅复制，嵌套对象仍共享引用。React 状态更新要创建新引用。日期接口应明确 ISO 8601、单位和时区；项目使用 Day.js 处理周期。`JSON.stringify` 会忽略 undefined/函数/symbol、把 Date 转字符串，并拒绝 BigInt。

## ES 版本意识

云函数运行时是 Node.js 20，但其 `tsconfig` 库为 ES2019；组件目标 ES2018、库包含 ES2020。运行时支持、类型声明、构建器转译、平台沙箱是四个不同边界，引入新 API 时都要确认。

