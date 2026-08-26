# 01 Java 开发者的 JavaScript 快速入门

## 五个心智切换

| Java | JavaScript / Node.js |
|---|---|
| 编译期静态类型 | JS 动态类型；TypeScript 只在开发期检查 |
| 类是主要抽象 | 函数、对象、闭包和模块更常见；`class` 基于原型 |
| 多线程服务 | 单个 JS 线程执行回调，I/O 由运行时调度 |
| 主要使用 `null` | 同时有 `undefined`、`null` 和多种 falsy 值 |
| checked/unchecked exception | 无 checked exception；Promise 拒绝必须处理 |

## 类型、值与相等

原始值有 string、number、boolean、bigint、symbol、undefined、null；对象、数组、函数按引用比较。默认使用严格相等 `===`，输入转换后检查 `Number.isFinite`。金额宜使用最小货币单位整数或 decimal 库，避免浮点误差。

```js
const a = { id: 1 };
const b = { id: 1 };
console.log(a === b); // false

const amount = Number('12.5');
if (!Number.isFinite(amount)) throw new TypeError('amount 非法');
```

## 变量、闭包和模块状态

默认 `const`，需要重新赋值才用 `let`，不使用 `var`。函数可捕获定义处变量，这就是闭包。本项目 `apaas-openapi.cjs` 的 `tokenCache` 是模块级状态：同一进程可复用，但冷启动、多实例间不共享，不能当分布式缓存。

## 函数与对象参数

```js
function normalizeCustomer({ name = '', ownerId, tags = [] } = {}) {
  return {
    name: String(name).trim(),
    ownerId: String(ownerId ?? '').trim(),
    tags: Array.isArray(tags) ? tags : [],
  };
}
```

项目入口常写成 `module.exports = async function (params, context, logger)`。`params = {}` 防止无参时解构失败；默认值只对 `undefined` 生效，不对 `null` 生效。

## 类、原型和 this

`class` 是原型机制的语法糖。普通函数的 `this` 由调用方式决定；箭头函数捕获外层 `this`。aPaaS `ViewModel`、`@reactive`、`@exposed` 使用类和装饰器，需要理解类字段初始化顺序及框架代理行为。

## 空值与防御式转换

`0`、`''`、`false`、`NaN`、`null`、`undefined` 都是 falsy。`||` 会把所有 falsy 当缺省，`??` 只处理 null/undefined：

```js
const pageSize = input.pageSize ?? 20;
const displayName = user?.profile?.name ?? '匿名';
```

跨 CRM、EOP、致远、飞书的数据必须做 `String(value)`、`Array.isArray`、trim、枚举映射和运行时校验。

## 异常

不要只记录 `error.message` 后吞掉异常，也不要把 Token 或完整个人信息写入日志。业务错误返回稳定错误码；系统错误保留 cause 和关联 ID。`finally` 用于释放连接、计时器或临时资源。

推荐阅读：`createCustomer/index.js` 的归一化—校验—查重—映射—创建—错误包装；`getCRMUserByName/index.js` 的兼容输入；`dashboardMapper.ts` 的动态数据到强类型模型转换。

