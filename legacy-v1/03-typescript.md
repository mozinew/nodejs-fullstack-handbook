# 03 TypeScript 核心知识

## 类型会被擦除

TypeScript 不会在运行时验证外部 JSON。网络、数据库和云函数参数必须另做运行时校验：

```ts
type Customer = { id: string; name: string };
function isCustomer(value: unknown): value is Customer {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return typeof row.id === 'string' && typeof row.name === 'string';
}
```

项目 `dashboardApi.ts` 的 `unknown → isRecord → normalizePayload` 比直接断言安全。

## 必学类型工具

- `interface`、`type`、联合/交叉、字面量类型、泛型。
- 可选和 readonly 属性、索引签名、判别联合。
- `keyof`、`typeof`、映射类型、条件类型。
- `Partial/Required/Pick/Omit/Record/ReturnType`。
- 类型守卫、断言函数、穷尽检查。
- React props、事件、ref、CSSProperties、泛型组件。
- `.d.ts`：aPaaS typings 描述平台注入对象。

`any` 会关闭检查；未知边界用 `unknown`。联合类型配合判别字段相当于轻量 sealed hierarchy。

## 当前 tsconfig

- `jsx: react-jsx`：自动 JSX runtime。
- `module/moduleResolution: nodenext`：Node ESM/CJS 解析规则。
- 组件 `target: es2018`、`lib: es2020, dom`。
- `noEmit: true`：只检查不输出。
- `skipLibCheck: true`：跳过第三方声明检查。
- `experimentalDecorators: true`：aPaaS ViewModel 装饰器。

云函数虽配置 `allowJs` 和 `noImplicitAny`，但纯 JS 的保护有限。迁移策略应是先补契约与校验，再迁移高风险公共函数，不做一次性改名。

## 企业边界三层契约

1. TypeScript 类型给开发者即时反馈。
2. Zod/class-validator 在运行时拒绝非法输入。
3. OpenAPI/JSON Schema 给调用方机器可读契约。

aPaaS `index.meta.json` 类似接口描述，但不能代替函数体校验。

