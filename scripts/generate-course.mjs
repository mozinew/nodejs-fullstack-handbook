import fs from 'node:fs';
import path from 'node:path';
import { course } from './course-data.mjs';

const root = path.resolve(import.meta.dirname, '..');
const write = (file, value) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value.endsWith('\n') ? value : `${value}\n`);
};
const inspect = value => JSON.stringify(value, null, 2);

for (const lesson of course) {
  const id = String(lesson.w).padStart(2, '0');
  const next = lesson.w < 32 ? `\n下一课：[第 ${lesson.w + 1} 周](/course/week-${String(lesson.w + 1).padStart(2, '0')})。` : '';
  write(path.join(root, 'docs', 'course', `week-${id}.md`), `# 第 ${lesson.w} 周：${lesson.t}

<div class="learning-contract">

**本周完成标准**：读完本课、完成 \`labs/week-${id}\`、让测试通过，并能不用答案解释 CRM 源码中的对应机制。

</div>

## 学习目标与前置知识

${lesson.o.map(x => `- ${x}`).join('\n')}

前置知识：第 ${lesson.w === 1 ? '0' : lesson.w - 1} 周内容。本周建议投入 10–15 小时，其中至少一半用于编码和测试。

## 从一个真实问题开始

${lesson.p}

先写下你的判断：错误会在什么时候发生、谁能观察到、怎样用最小实验证明。课程的目标不是记答案，而是形成这套推理过程。

## 从零理解

${lesson.m}

把机制分成三层理解：语法告诉你代码怎样写；运行时决定它何时执行；工程约束决定它在失败、并发和变化下是否仍正确。只会第一层，代码通常只能在演示环境工作。

<div class="java-bridge">

**Java/Spring 对照**：${lesson.j}

</div>

## 可运行示例

参考实现来自本周已测试的 solution：

<<< ../../solutions/week-${id}/index.js

输入：

\`\`\`json
${inspect(lesson.input)}
\`\`\`

预期结果：

\`\`\`json
${inspect(lesson.expected)}
\`\`\`

不要只复制代码。逐个表达式说明输入域、返回值、可能抛出的错误，以及为什么没有修改原始输入。

## 常见错误与排错

**错误写法/思路**：${lesson.bad}

排错时先缩小边界：打印类型和长度而非整个敏感对象；保留完整错误栈；用一个正常、一个边界、一个非法输入复现。若异步失败，再记录开始、结束、requestId 和耗时，确认 Promise 是否真正被等待。

## 当前 CRM 项目导读

${lesson.crm}

阅读要求：找到入口、列出输入输出、圈出平台边界、画出失败路径。不要先修改生产代码。本书附录提供[完整项目地图](/appendix/project-map)。

## 动手实验

${lesson.task}

\`\`\`bash
cd labs/week-${id}
node --test
# 修改 index.mjs 后重复运行，直到全部通过
\`\`\`

通过测试后，再查看 \`solutions/week-${id}\`。参考答案不是唯一实现；只要行为、错误边界和可读性满足测试即可。

## 自测

1. 用自己的话解释本周机制，而不是复述术语。
2. 如果输入为 null、空数组、重复值或依赖失败，结果是什么？
3. Java 类比在哪些地方成立，在哪些地方会误导？
4. 当前 CRM 代码是否存在本周讲到的风险？证据在哪一行？

<details><summary>参考答案方向</summary>

答案必须包含“行为、原因、证据”三部分。对第 4 题，只写风险名称不得分；需要给出调用链、触发条件和最小验证方法。

</details>

## 本周总结

完成本周后，你应能把 ${lesson.t} 用在一个可运行程序中，并能在 CRM 项目里识别它的真实边界。${next}
`);

  const testInput = lesson.inputExpr ?? inspect(lesson.input);
  const test = `import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { solve } from './index.js';\n\ntest('week ${id}: ${lesson.t}', async () => {\n  const actual = await solve(${testInput});\n  assert.deepEqual(actual, ${inspect(lesson.expected)});\n});\n`;
  write(path.join(root, 'labs', `week-${id}`, 'README.md'), `# 第 ${lesson.w} 周实验：${lesson.t}\n\n任务：${lesson.task}\n\n运行 \`node --test\`。初始失败是正常的；完成 \`index.mjs\` 后必须通过。遇错依次确认工作目录、Node 版本、导出名称、输入类型和完整堆栈。\n`);
  write(path.join(root, 'labs', `week-${id}`, 'index.js'), `export function solve(input) {\n  void input;\n  throw new Error('TODO: 完成第 ${lesson.w} 周实验');\n}\n`);
  write(path.join(root, 'labs', `week-${id}`, 'index.test.mjs'), test);
  write(path.join(root, 'solutions', `week-${id}`, 'README.md'), `# 第 ${lesson.w} 周参考答案\n\n先让 starter 测试通过再阅读。本实现强调清晰边界；对照时说明你的实现与它在输入校验、可读性和副作用方面的差异。\n`);
  write(path.join(root, 'solutions', `week-${id}`, 'index.js'), `${lesson.sol}\n`);
  write(path.join(root, 'solutions', `week-${id}`, 'index.test.mjs'), test);
}

console.log(`generated ${course.length} lessons and lab pairs`);
