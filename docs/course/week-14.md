# 第 14 周：tsconfig、CJS/ESM、npm 与工程基线

<div class="learning-contract">

**本周完成标准**：读完本课、完成 `labs/week-14`、让测试通过，并能不用答案解释 CRM 源码中的对应机制。

</div>

## 学习目标与前置知识

- 读懂模块配置
- 使用 lockfile
- 解释构建目标

前置知识：第 13 周内容。本周建议投入 10–15 小时，其中至少一半用于编码和测试。

## 从一个真实问题开始

本地 Vite 能 import，云函数 CommonJS 部署却找不到默认导出。

先写下你的判断：错误会在什么时候发生、谁能观察到、怎样用最小实验证明。课程的目标不是记答案，而是形成这套推理过程。

## 从零理解

CJS 在运行时 require，ESM 使用静态 import。package type、扩展名、moduleResolution 和构建器共同决定解析。lockfile 固定完整依赖图，CI 使用 npm ci。target 决定输出语法，lib 决定类型可见性。

把机制分成三层理解：语法告诉你代码怎样写；运行时决定它何时执行；工程约束决定它在失败、并发和变化下是否仍正确。只会第一层，代码通常只能在演示环境工作。

<div class="java-bridge">

**Java/Spring 对照**：类似 Maven scope、编译 target 和模块系统的组合，但 Node 同时存在两套模块格式。

</div>

## 可运行示例

参考实现来自本周已测试的 solution：

<<< ../../solutions/week-14/index.js

输入：

```json
{
  "from": "1.4.0",
  "to": "2.0.0"
}
```

预期结果：

```json
true
```

不要只复制代码。逐个表达式说明输入域、返回值、可能抛出的错误，以及为什么没有修改原始输入。

## 常见错误与排错

**错误写法/思路**：随意混用 require/import；删除 lockfile 解决依赖冲突。

排错时先缩小边界：打印类型和长度而非整个敏感对象；保留完整错误栈；用一个正常、一个边界、一个非法输入复现。若异步失败，再记录开始、结束、requestId 和耗时，确认 Promise 是否真正被等待。

## 当前 CRM 项目导读

阅读两个 tsconfig 和 `vite.config.ts` 的 createRequire。

阅读要求：找到入口、列出输入输出、圈出平台边界、画出失败路径。不要先修改生产代码。本书附录提供[完整项目地图](/appendix/project-map)。

## 动手实验

解析 semver 主版本并判断是否为破坏性主版本差异。

```bash
cd labs/week-14
node --test
# 修改 index.mjs 后重复运行，直到全部通过
```

通过测试后，再查看 `solutions/week-14`。参考答案不是唯一实现；只要行为、错误边界和可读性满足测试即可。

## 自测

1. 用自己的话解释本周机制，而不是复述术语。
2. 如果输入为 null、空数组、重复值或依赖失败，结果是什么？
3. Java 类比在哪些地方成立，在哪些地方会误导？
4. 当前 CRM 代码是否存在本周讲到的风险？证据在哪一行？

<details><summary>参考答案方向</summary>

答案必须包含“行为、原因、证据”三部分。对第 4 题，只写风险名称不得分；需要给出调用链、触发条件和最小验证方法。

</details>

## 本周总结

完成本周后，你应能把 tsconfig、CJS/ESM、npm 与工程基线 用在一个可运行程序中，并能在 CRM 项目里识别它的真实边界。
下一课：[第 15 周](/course/week-15)。
