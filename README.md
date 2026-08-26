# Node.js 全栈学习手册：Java 后端到飞书 aPaaS 全栈

> 基于 `/Users/dong/APaas/crm/code/package_22de35__c` 的代码盘点，更新于 2026-08-26。

## 目标与边界

这不是一本脱离业务的语法百科。它有三条主线：用 Java/Spring 经验快速建立 JavaScript、TypeScript、Node.js 心智模型；能维护当前 CRM aPaaS 项目；继续成长为能交付企业系统的全栈工程师。

盘点范围排除了 `node_modules`、`.ae` 合并缓存和生成文件。当前可见主体包括 67 个 Node.js 20 云函数目录、4 个自定义组件和 Vite 本地调试壳。页面设计器中的 JS 方法与表达式未包含在导出物中，第 09 章提供通用体系和补录模板，不能视为线上页面脚本的逐行审计。

## 导航

1. [Java 开发者的 JavaScript 快速入门](01-java-to-javascript.md)
2. [ES 标准与现代 JavaScript](02-modern-javascript.md)
3. [TypeScript 核心知识](03-typescript.md)
4. [Node.js 运行时、异步模型与核心 API](04-node-runtime.md)
5. [npm、模块系统与工程化](05-modules-tooling.md)
6. [飞书 aPaaS 云函数开发](06-apaas-cloud-functions.md)
7. [CRM 项目完整知识地图](07-crm-code-map.md)
8. [React、自定义组件与前端基础](08-react-frontend.md)
9. [页面 JS 方法和表达式](09-page-scripts.md)
10. [本地调试、Vite 与 SDK 适配](10-local-dev.md)
11. [测试、性能、安全和可观测性](11-quality-security-observability.md)
12. [NestJS 企业级 Node.js 生态](12-enterprise-ecosystem.md)
13. [AI 辅助全栈研发方法](13-ai-workflow.md)
14. [16 周学习与实战路线](14-16-week-roadmap.md)
15. [练习与参考答案](15-exercises-answers.md)
16. [术语表、参考资料与能力清单](16-glossary-references.md)

## 推荐方法

每个知识点按四步学习：说出它与 Java 的异同；在当前项目找到真实用例；写最小实验；用测试或日志证明理解正确。建议每周 10–15 小时：阅读 25%、编码 50%、复盘 15%、AI 协作 10%。

始终追踪完整链路：

```text
React/页面事件 → invokeFunction → index.meta.json → 云函数入口
→ application/context/connector → 数据或外部系统 → 返回契约 → UI 映射
```

## 四级目标

- L1：能解释作用域、闭包、原型、Promise、事件循环和模块。
- L2：能安全修改云函数或组件，完成本地联调并定位失败层。
- L3：能设计类型化 API、数据模型、测试、鉴权、缓存和部署流水线。
- L4：能处理性能、可靠性、安全、可观测性、演进和团队规范。

“精通”不是背完 API，而是在未知需求和故障下仍能建立模型、验证假设并稳定交付。

