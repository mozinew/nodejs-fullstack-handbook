# 安装学习环境

## 需要的软件

- Node.js 24 LTS：课程主线。维护 CRM 时另用 Node.js 20 验证兼容性。
- Git：保存每次实验进度。
- VS Code 或同等编辑器：启用 TypeScript、ESLint 和调试器。
- Docker Desktop：第 26 周以后运行 PostgreSQL、Redis 与队列。

安装后执行：

```bash
node --version
npm --version
git --version
```

Node 应显示 `v24.x`。如果公司机器只能使用 Node 20，可以先完成第 1–24 周；每个不兼容点会在“项目兼容”提示中标记。

## 安装教材依赖

```bash
git clone <你的手册仓库地址>
cd nodejs-fullstack-handbook
npm ci
npm run check
npm run docs:dev
```

浏览器访问终端显示的本地地址。`npm run check` 会检查教材结构、项目覆盖、类型、答案测试和站点构建。

## 第一次故障练习

如果 `node` 找不到，先确认安装目录是否进入 PATH，而不是反复重装。如果 `npm ci` 报 lockfile 不一致，确认使用的是教材根目录和正确分支。把“命令、完整错误、环境版本、已验证事实”记录下来，这是后续所有排错的基本格式。

下一步：[学习与验收方法](./method.md)。
