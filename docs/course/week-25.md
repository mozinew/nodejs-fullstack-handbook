# 第 25 周：NestJS 模块、Controller、Provider 与 DI

<div class="learning-contract">

**本周完成标准**：读完本课、完成 `labs/week-25`、让测试通过，并能不用答案解释 CRM 源码中的对应机制。

</div>

## 学习目标与前置知识

- 建立模块边界
- 使用构造器注入
- 保持 Controller 薄

前置知识：第 24 周内容。本周建议投入 10–15 小时，其中至少一半用于编码和测试。

## 从一个真实问题开始

云函数把校验、查询、映射、外部调用全写在一个 600 行入口里。

先写下你的判断：错误会在什么时候发生、谁能观察到、怎样用最小实验证明。课程的目标不是记答案，而是形成这套推理过程。

## 从零理解

Module 声明边界，Controller 处理协议，Provider 实现用例，Repository/Adapter 隔离技术依赖。依赖从外向内，领域逻辑不 import Nest 或 Prisma。

把机制分成三层理解：语法告诉你代码怎样写；运行时决定它何时执行；工程约束决定它在失败、并发和变化下是否仍正确。只会第一层，代码通常只能在演示环境工作。

<div class="java-bridge">

**Java/Spring 对照**：Module、Controller、Injectable 与 Spring Configuration、RestController、Service 高度相似。

</div>

## 可运行示例

参考实现来自本周已测试的 solution：

<<< ../../solutions/week-25/index.js

输入：

```json
{
  "repo": "CustomerRepository",
  "input": {
    "name": " 客户A "
  }
}
```

预期结果：

```json
{
  "id": "c1",
  "name": "客户A"
}
```

不要只复制代码。逐个表达式说明输入域、返回值、可能抛出的错误，以及为什么没有修改原始输入。

## 常见错误与排错

**错误写法/思路**：把业务写在 Controller；使用全局单例绕过 DI。

排错时先缩小边界：打印类型和长度而非整个敏感对象；保留完整错误栈；用一个正常、一个边界、一个非法输入复现。若异步失败，再记录开始、结束、requestId 和耗时，确认 Promise 是否真正被等待。

## 当前 CRM 项目导读

把 createCustomer 拆成 handler、use case、repository adapter 的设计练习。

阅读要求：找到入口、列出输入输出、圈出平台边界、画出失败路径。不要先修改生产代码。本书附录提供[完整项目地图](/appendix/project-map)。

## 动手实验

通过注入的 repository 创建客户，证明业务不依赖全局对象。

```bash
cd labs/week-25
node --test
# 修改 index.mjs 后重复运行，直到全部通过
```

通过测试后，再查看 `solutions/week-25`。参考答案不是唯一实现；只要行为、错误边界和可读性满足测试即可。

## 自测

1. 用自己的话解释本周机制，而不是复述术语。
2. 如果输入为 null、空数组、重复值或依赖失败，结果是什么？
3. Java 类比在哪些地方成立，在哪些地方会误导？
4. 当前 CRM 代码是否存在本周讲到的风险？证据在哪一行？

<details><summary>参考答案方向</summary>

答案必须包含“行为、原因、证据”三部分。对第 4 题，只写风险名称不得分；需要给出调用链、触发条件和最小验证方法。

</details>

## 本周总结

完成本周后，你应能把 NestJS 模块、Controller、Provider 与 DI 用在一个可运行程序中，并能在 CRM 项目里识别它的真实边界。
下一课：[第 26 周](/course/week-26)。
