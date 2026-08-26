# 教材工具链安全说明

教材没有生产运行依赖，`npm audit --omit=dev` 应为 0。VitePress 1.6.4 当前稳定版依赖的开发服务器存在上游 esbuild/Vite 公告，暂无稳定版修复。

本仓库把开发服务器强制绑定到 `127.0.0.1`，不要使用 `--host 0.0.0.0` 暴露到不可信网络。静态生产构建不包含该开发服务器。升级 VitePress 后应重新运行 `npm audit` 和 `npm run check`。

不要在教材 fixture、环境文件、截图或日志中提交真实 Token、Cookie、客户数据和员工身份信息。
