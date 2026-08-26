# 08 React、自定义组件与前端基础

## 浏览器基础

先掌握 DOM、事件冒泡、表单、CSS 盒模型/Flex、HTTP/CORS、Cookie/Storage 和同源策略。浏览器代码不应包含服务端密钥；所有权限都必须由服务端再次判断。

## React 核心

- 组件是 UI 的纯描述，props 是输入，state 是组件记忆。
- Hook 必须在顶层按固定顺序调用。
- `useState` 管本地状态；`useRef` 保存可变值/DOM 且不触发渲染。
- `useEffect` 同步外部系统，返回清理函数。
- `useMemo/useCallback` 是性能工具，不是默认必需品。
- 受控表单由 state 决定 value；回调把变化向上通知。

`useDashboardData` 用递增 `requestId` 避免旧请求覆盖新筛选结果，这是处理竞态的实用模式；更完整方案可配合 AbortController 取消旧请求。

## 当前组件技术点

### agent_input

使用 state、ref、callback、effect、键盘事件和轮询。卸载时清理 interval 是正确做法。需要改进：用户 ID 不应硬编码；轮询应退避和处理 Failed/Cancelled；`dangerouslySetInnerHTML` 前必须用 DOMPurify 等白名单清洗 Showdown 输出。

### dashboardBusinessOverview

形成 `API → runtime validation → mapper → view model → charts/tables` 分层。`contractVersion` 防止前后端错版；请求回显校验防止筛选串线。ECharts 实例需 resize 和 dispose；大量图表需控制重渲染。

### PC/移动级联组件

ViewModel 用 `@reactive` 暴露状态、`@exposed` 暴露平台方法；组件通过 `useViewModel/observer` 连接。理解 props、model、内部 state 三个真相源，避免同步循环。动态插入 style 时必须在 effect cleanup 移除。

## 状态与数据流

先用组件 state 和自定义 Hook；跨页缓存再考虑 TanStack Query；真正的全局客户端状态再选 Zustand/Redux Toolkit。服务端数据与 UI 状态不要混在一个 store。

## UI 与可访问性

Ant Design/Ant Design Mobile 提供组件，不替代语义化 HTML。输入框必须有 label，键盘可操作，错误可被辅助技术识别；颜色不能是唯一提示。表格和图表应提供空态、加载态、错误态和文本摘要。

## 前端测试

- 纯 mapper/period 函数：Vitest 单元测试。
- Hook/组件：Testing Library，以用户行为而非内部 state 断言。
- 云函数边界：Mock Service Worker 或适配器 stub。
- 核心链路：Playwright E2E。

