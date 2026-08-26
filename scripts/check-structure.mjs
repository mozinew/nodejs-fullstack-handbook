import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const requiredHeadings = ['学习目标与前置知识','从一个真实问题开始','从零理解','可运行示例','常见错误与排错','当前 CRM 项目导读','动手实验','自测','本周总结'];
const errors = [];

for (let week = 1; week <= 32; week++) {
  const id = String(week).padStart(2, '0');
  const lesson = path.join(root, 'docs/course', `week-${id}.md`);
  for (const file of [lesson, path.join(root,'labs',`week-${id}`,'README.md'), path.join(root,'labs',`week-${id}`,'index.js'), path.join(root,'labs',`week-${id}`,'index.test.mjs'), path.join(root,'solutions',`week-${id}`,'index.js'), path.join(root,'solutions',`week-${id}`,'index.test.mjs')]) {
    if (!fs.existsSync(file)) errors.push(`missing ${path.relative(root,file)}`);
  }
  if (fs.existsSync(lesson)) {
    const text = fs.readFileSync(lesson,'utf8');
    for (const heading of requiredHeadings) if (!text.includes(`## ${heading}`)) errors.push(`week-${id} missing heading ${heading}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('structure ok: 32 lessons, labs and solutions');
