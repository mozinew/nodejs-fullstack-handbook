# Node.js 全栈学习手册

面向 Java 后端工程师的 32 周项目驱动式教材：从 JavaScript 零基础，到维护飞书 aPaaS CRM，再到构建 React + NestJS 企业系统。

## 开始学习

```bash
npm ci
npm run check
npm run docs:dev
```

浏览器打开终端显示的地址，从“如何使用本书”开始。不要直接阅读 `solutions`；每周先完成 `labs/week-XX`。

## 仓库内容

- `docs/`：VitePress 教材正文、课程和项目附录。
- `labs/`：32 个带失败测试的 starter。
- `solutions/`：32 个通过测试的参考实现。
- `projects/`：七个阶段项目说明和 CRM 毕业项目。
- `legacy-v1/`：第一版知识大纲，仅供版本追溯。

## 常用命令

| 命令 | 用途 |
|---|---|
| `npm run docs:dev` | 启动本地教材站 |
| `npm run docs:build` | 构建静态站点 |
| `npm run test:solutions` | 运行全部参考答案与毕业门禁测试 |
| `npm run typecheck` | 检查站点配置和 TypeScript 源码 |
| `npm run check` | 执行结构、项目覆盖、类型、测试和构建全验收 |

课程主线使用 Node.js 24 LTS；当前 CRM 专题明确标注 Node.js 20、React 17 的兼容边界。教材不会读取或保存生产凭证与真实客户数据。
