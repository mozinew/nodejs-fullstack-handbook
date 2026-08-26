# 09 页面 JS 方法和表达式

## 当前边界

仓库没有页面设计器配置、页面 JS 方法或表达式源码。以下内容是可直接应用的通用章；拿到页面导出物后，用末尾模板逐页补录。

## 页面脚本原则

页面表达式应短、纯、无副作用；复杂校验、异步编排和数据转换放入命名方法；权限和核心业务规则放云函数。避免在表达式中进行网络请求、修改多个状态或复制后端规则。

```js
// 适合表达式
form.customerName?.trim()?.length > 0

// 适合页面方法
async function submitCustomer(form, services) {
  const payload = normalizeCustomer(form);
  const result = await services.invokeFunction('createCustomer', payload);
  if (!result?.success) throw new Error(result?.message ?? '创建失败');
  return result;
}
```

## 常见知识点

- 页面生命周期：初始化、加载、展示、卸载。
- 事件对象和组件值；不要假设事件始终存在。
- 可选链、空值合并、三元表达式、数组判断。
- 同步校验与异步校验的时机。
- debounce 用于输入搜索，throttle 用于高频滚动；提交按钮要防重复点击。
- 异步请求处理 loading/success/empty/error，finally 恢复状态。
- 多请求存在竞态，使用请求序号或 AbortController。
- 日期、枚举、人员和关联字段按 API 值传输，不依赖展示文案。

## 页面到云函数的安全边界

浏览器传来的 ownerId、角色、金额、对象名、字段名都不可信。页面只负责体验；云函数负责身份、授权、白名单、数据校验和审计。错误返回用户可理解的 message，同时用 errorCode 支持程序判断。

## 补录模板

| 页面/事件 | 脚本位置 | 输入 | 副作用 | 调用函数 | 错误态 | 知识点 | 风险/改进 |
|---|---|---|---|---|---|---|---|
| 待补 | 待补 | 待补 | 待补 | 待补 | 待补 | 待补 | 待补 |

补充材料应包括页面 JSON/导出包、全局方法、事件脚本、公式表达式和所调用流程/API。补录时先做静态调用图，再逐条映射本章知识。

